import {forwardRef, Module} from "@nestjs/common"
import {PrismaModule} from "../../../core/src/modules/prisma.module";
import {SystemSchedulerManageService} from "./system-scheduler-manage.service";


@Module({
    imports: [forwardRef(() => PrismaModule)],
    providers: [SystemSchedulerManageService],
    exports: [SystemSchedulerManageService],
})
export class SchedulerEntityModule {}
