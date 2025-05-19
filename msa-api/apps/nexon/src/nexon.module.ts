import {Module} from "@nestjs/common"
import {EventAppModule} from "../../event/src/event-app.module";
import {SharedModule} from "../../../libs/core/src/modules/shared.module";
import {AuthAppModule} from "../../auth/src/auth-app.module";
import {UserAppModule} from "../../user/src/user-app.module";

@Module({
    imports: [
        SharedModule,
        AuthAppModule,
        EventAppModule,
        UserAppModule,
    ],
})
export class NexonModule {}
