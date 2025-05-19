import {Injectable, Logger} from "@nestjs/common"
import {PrismaService} from "../../../../../libs/entity/src/prisma.service";

@Injectable()
export class UserDeviceService {
    private readonly logger = new Logger(UserDeviceService.name)
    constructor(private readonly prisma: PrismaService) {}

}
