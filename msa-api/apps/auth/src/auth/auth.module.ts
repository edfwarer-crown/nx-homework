import {forwardRef, Module} from "@nestjs/common"
import {PrismaModule} from "../../../../libs/core/src/modules/prisma.module";
import {RedisConfigModule} from "../../../../libs/core/src/modules/redis-config.module";
import {AuthConfigModule} from "../../../../libs/core/src/modules/auth-config.module";
import {AuthService} from "./auth.service";
import {UserSignUpService} from "./user-sign-up.service";


@Module({
    imports: [
        forwardRef(() => PrismaModule),
        forwardRef(() => RedisConfigModule),
        forwardRef(() => AuthConfigModule),
    ],
    providers: [AuthService, UserSignUpService],
    exports: [AuthService, UserSignUpService],
    controllers: [],
})
export class AuthModule {}
