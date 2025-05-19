import {Injectable, Logger} from "@nestjs/common"
import {PrismaService} from "../prisma.service"

@Injectable()
export class SystemSchedulerManageService {
    private readonly logger = new Logger(SystemSchedulerManageService.name)

    constructor(private readonly prisma: PrismaService) {}
    // TODO batch로 보상을 주고 싶다..
}
