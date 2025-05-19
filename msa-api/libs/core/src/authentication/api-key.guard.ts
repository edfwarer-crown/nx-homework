import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {FastifyRequest} from "fastify"
import {Observable} from "rxjs"

import {JwtConfig} from "@libs/core/config"

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly superKey: string

    constructor(configService: ConfigService) {
        this.superKey = configService.get<JwtConfig>("jwt").admin
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<FastifyRequest>()

        const pkey = request.query["pkey"] as string | undefined | null

        if (!pkey) {
            throw new UnauthorizedException("Unauthorized exception")
        }

        if (pkey !== this.superKey) {
            throw new UnauthorizedException("Unauthorized exception")
        }

        return true
    }
}
