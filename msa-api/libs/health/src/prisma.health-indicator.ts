import {Injectable} from "@nestjs/common"
import {HealthIndicator} from "@nestjs/terminus"
import {PrismaService} from "../../entity/src/prisma.service";

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
    constructor(private readonly prisma: PrismaService) {
        super()
    }
}
