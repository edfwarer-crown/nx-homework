import {DateTimeFormatter, ZonedDateTime} from "@js-joda/core"
import {RedisService} from "@liaoliaots/nestjs-redis"
import {GoneException, Inject, Injectable, Logger, NotFoundException, UnauthorizedException} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {JwtService} from "@nestjs/jwt"
import {ClientProxy} from "@nestjs/microservices"
import * as bcrypt from "bcrypt"
import Redis from "ioredis"
import {firstValueFrom} from "rxjs"
import {JwtConfig} from "../../../../libs/core/src/config/config.type";
import {UserEntity} from "../../../../libs/entity/src/prisma";
import {getUserPayloadFrom, UserPayload} from "../../../../libs/utils/src/decorator/user.decorator";


export type JwtInfo = {sub: string, iat: number, exp: number}

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    private readonly redis: Redis | null
    private readonly authToken: string

    constructor(
        @Inject("MICRO_SERVICE") private clientProxy: ClientProxy,
        configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
    ) {
        this.redis = this.redisService.getOrNil()
        this.authToken = configService.get<JwtConfig>("jwt").admin
    }

    async validateUser(type: "USERNAME" | "CELL_NUMBER", username: string, password: string) {
        let user: Partial<UserEntity>

        switch (type) {
            case "USERNAME":
                user = await firstValueFrom(this.clientProxy.send<Partial<UserEntity>>({cmd: "user.getOne"}, {username}).pipe())
                break
            case "CELL_NUMBER":
                user = await firstValueFrom(this.clientProxy.send<Partial<UserEntity>>({cmd: "user.getOne"}, {cellNumber: username}).pipe())
                break
        }

        if (!user || !bcrypt.compareSync(password, user?.password)) {
            throw new UnauthorizedException()
        }

        const {enabled, isDormant, isAccountExpired, isAccountLocked} = user

        if (isDormant) {
            throw new GoneException(`휴면 계정`)
        }

        if (isAccountExpired) {
            throw new GoneException("사용 기간 만료 계정")
        }

        if (isAccountLocked) {
            throw new GoneException("사용 제한 계정")
        }

        if (!enabled) {
            this.logger.log("비활성화된 계정")
            throw new NotFoundException("계정을 찾을 수 없습니다.")
        }

        const {password: pwd, ...result} = user

        return result
    }

    async signIn(type: "USERNAME" | "CELL_NUMBER", username: string, password: string): Promise<string> {
        const user = await this.validateUser(type, username, password)

        const userDetail = getUserPayloadFrom(user)

        const payload = {
            sub: user.username,
            detail: userDetail,
        }

        return this.jwtService.sign(payload)
    }

    async allowTokenSince(token: string) {
        const {sub, iat, exp} = this.jwtService.decode<UserPayload & JwtInfo>(token)
        // whitelist의 기간은 발급했을 때의 만료시간 - 현재시간으로 해서 구한다.
        return this.redis.set(sub, iat, "EX", exp - Math.floor(Date.now() / 1000)).then((status) => {
            return status == "OK"
        })
    }

    async banToken(token: string, reason: string = "Banned by Sign out") {
        try {
            return await this.redis.set(token, reason, "EX", 86400).then((status) => {
                this.logger.log(`token will be block until ${ZonedDateTime.now().plusSeconds(86400).format(DateTimeFormatter.ISO_DATE_TIME)}`)
                return status == "OK"
            })
        } catch (e) {
            this.logger.warn(`Banning token is not success.`)
            return true
        }
    }
}
