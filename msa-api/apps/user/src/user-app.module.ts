import {ProfileController} from "@apps/user/user/profile.controller"
import {UserController} from "@apps/user/user/user.controller"
import {UserModule} from "@apps/user/user/user.module"
import {UserProducer} from "@apps/user/user/user.producer"
import {AuthConfigModule, SharedModule} from "@libs/core"
import {GA4Module} from "@libs/core/gtm/ga4.module"
import {forwardRef, Module} from "@nestjs/common"

@Module({
    imports: [
        forwardRef(() => SharedModule),
        forwardRef(() => GA4Module),
        AuthConfigModule,
        UserModule,
    ],
    controllers: [
        UserProducer,
        UserController,
        ProfileController,
    ],
    providers: [],
    exports: [],
})
export class UserAppModule {}
