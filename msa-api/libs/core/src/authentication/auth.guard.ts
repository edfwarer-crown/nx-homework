import {RedisService} from "@liaoliaots/nestjs-redis"
import {CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {Reflector} from "@nestjs/core"
import {JwtService} from "@nestjs/jwt"
import {ClientProxy} from "@nestjs/microservices"
import {FastifyRequest} from "fastify"
import Redis from "ioredis"
import {firstValueFrom} from "rxjs"

import {JwtInfo} from "@apps/auth/auth/auth.service"
import {IS_API_KEY_ACCESSIBLE} from "@libs/core/authentication/api-key-acessible.decorator"
import {JwtConfig} from "@libs/core/config"
import {UserEntity} from "@libs/entity/prisma"
import {getUserPayloadFrom, IS_PUBLIC_KEY, UserPayload} from "@libs/utils/decorator"

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name)
    private readonly jwtConfig: JwtConfig
    private readonly redis: Redis | null

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector,
        redisService: RedisService,
        @Inject("MICRO_SERVICE") private readonly clientProxy: ClientProxy,
    ) {
        this.redis = redisService.getOrNil()
        this.jwtConfig = this.configService.get<JwtConfig>("jwt")
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<FastifyRequest>()
        const {type, token} = this.extractTokenFromHeader(request)

        // 두가지 타입만 허용
        if (!["BEARER", "BASIC_AUTH"].includes(type)) {
            const apiKeyAccesible = this.reflector.getAllAndOverride<boolean>(IS_API_KEY_ACCESSIBLE, [context.getHandler(), context.getClass()])

            if (apiKeyAccesible) {
                return true
            }

            // Anonymous일 경우만 public 여부 확인
            return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
        }

        if (type === "BEARER") {
            if (!token) {
                this.logger.error("Cannot retrive token from header")
                throw new UnauthorizedException("CANNOT_RETRIEVE_TOKEN_FROM_HEADER")
            } else {
                const isBlocked = await this.redis.get(token)
                if (isBlocked) {
                    throw new UnauthorizedException("BANNED_TOKEN")
                }
            }

            if (this.jwtConfig.admin && token === this.jwtConfig.admin) {
                return true
            }

            const {sub, iat} = this.jwtService.decode<JwtInfo & {detail: UserPayload}>(token)
            const exists = await this.redis.get(sub)
            if (exists) {
                const passwordChanged = +exists
                if (iat < passwordChanged) {
                    throw new UnauthorizedException("PASSWORD_WAS_CHANGED")
                }
            }

            try {
                const tokenInfo = this.jwtService.verify<JwtInfo & {detail: UserPayload}>(token)
                const user = tokenInfo.detail
                request["user"] = user
            } catch {
                throw new UnauthorizedException("CANNOT_RETRIEVE_PAYLOAD_FROM_TOKEN")
            }
        }

        if (type === "BASIC_AUTH") {
            // BASIC_AUTH
            const [username, password] = Buffer.from(token, "base64").toString("utf8").split(":")

            let user: Partial<UserEntity>

            if (this.jwtConfig.admin && password === this.jwtConfig.admin) {
                user = await firstValueFrom(this.clientProxy.send<Partial<UserEntity>>({cmd: "user.getOne"}, {username}).pipe())
            } else {
                user = await firstValueFrom(this.clientProxy.send<Partial<UserEntity>>({cmd: "auth.validateUser"}, {username, password}).pipe())
            }

            if (user === null) {
                return false
            }

            request["user"] = getUserPayloadFrom(user)
        }

        return true
    }

    private extractTokenFromHeader(request: FastifyRequest): {token?: string, type: "BEARER" | "BASIC_AUTH" | "ANOMYMOUS"} | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? []
        return type === "Bearer" ? {token: token, type: "BEARER"} : type === "Basic" ? {token: token, type: "BASIC_AUTH"} : {type: "ANOMYMOUS"}
    }
}
