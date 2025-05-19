import {forwardRef, Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"

import {AuthController} from "./auth/auth.controller";
import {MsaModule} from "../../../libs/core/src/modules/msa.module";
import {GA4Module} from "../../../libs/core/src/gtm/ga4.module";
import {externConfig} from "../../../libs/core/src/config";
import {SharedModule} from "../../../libs/core/src/modules/shared.module";
import {AuthModule} from "./auth/auth.module";
import {AuthProducer} from "./auth/auth.producer";

@Module({
    imports: [
        forwardRef(() => MsaModule),
        forwardRef(() => GA4Module),
        ConfigModule.forFeature(externConfig),
        SharedModule,
        AuthModule,
    ],
    controllers: [AuthController, AuthProducer],
})
export class AuthApiModule {}
