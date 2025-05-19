import {forwardRef, Module} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {APP_GUARD} from "@nestjs/core"
import {JwtModule} from "@nestjs/jwt"
import {MsaModule} from "./msa.module";
import {RedisConfigModule} from "./redis-config.module";
import {JwtConfig} from "../config/config.type";
import {AuthGuard} from "../authentication/auth.guard";


@Module({
    imports: [
        forwardRef(() => MsaModule),
        forwardRef(() => RedisConfigModule),
        JwtModule.registerAsync({
            global: true,
            imports: [],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<JwtConfig>("jwt").secret,
                    signOptions: {expiresIn: "1 day", algorithm: "HS512"},
                }
            },
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AuthConfigModule {}
