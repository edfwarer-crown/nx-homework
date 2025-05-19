import {Module} from "@nestjs/common"

import {EventApiModule} from "./event/event-api.module";
import {SharedModule} from "../../../libs/core/src/modules/shared.module";
import {AuthConfigModule} from "../../../libs/core/src/modules/auth-config.module";
import {RedisConfigModule} from "../../../libs/core/src/modules/redis-config.module";

@Module({
    imports: [
        SharedModule,
        AuthConfigModule,
        RedisConfigModule,
        EventApiModule,
    ],
})
export class EventAppModule {}
