import {HttpModule} from "@nestjs/axios"
import {forwardRef, Module} from "@nestjs/common"

import {SharedModule} from "@libs/core"
import {PrismaModule} from "@libs/core/modules/prisma.module"
import {EventController} from "./event.controller";
import {EventService} from "./event.service";

@Module({
    imports: [
        forwardRef(() => PrismaModule),
        forwardRef(() => SharedModule),
        forwardRef(() => HttpModule),
    ],
    controllers: [EventController],
    providers: [EventService],
    exports: [EventService],
})
export class EventApiModule {}
