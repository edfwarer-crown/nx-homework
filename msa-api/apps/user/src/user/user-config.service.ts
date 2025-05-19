import {Injectable} from "@nestjs/common"
import {PrismaService} from "../../../../libs/entity/src/prisma.service";

@Injectable()
export class UserConfigService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

}
