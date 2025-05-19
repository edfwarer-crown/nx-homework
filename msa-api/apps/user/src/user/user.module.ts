import {forwardRef, Module} from "@nestjs/common"

import {UserDeviceService} from "@apps/user/user/service/user-device.service"
import {UserConfigService} from "@apps/user/user/user-config.service"
import {UserService} from "@apps/user/user/user.service"
import {MsaModule} from "@libs/core/modules/msa.module"
import {PrismaModule} from "@libs/core/modules/prisma.module"
import {RedisConfigModule} from "@libs/core/modules/redis-config.module"

@Module({
    imports: [
        forwardRef(() => PrismaModule),
        forwardRef(() => RedisConfigModule),
        forwardRef(() => MsaModule),
    ],
    controllers: [],
    providers: [
        UserService,
        UserConfigService,
        UserDeviceService,
    ],
    exports: [
        UserService,
        UserConfigService,
        UserDeviceService,
    ],
})
export class UserModule {}
