import * as process from "node:process"

import {Controller, Get, NotFoundException, Post, VERSION_NEUTRAL} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {ApiBasicAuth, ApiExcludeEndpoint} from "@nestjs/swagger"
import {DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, PrismaHealthIndicator} from "@nestjs/terminus"
import {Api} from "../../utils/src/decorator/common-api.decorator";
import {PrismaService} from "../../entity/src/prisma.service";
import {ApiAuth} from "../../utils/src/decorator/api-auth.decorator";
import {User, UserPayload} from "../../utils/src/decorator/user.decorator";


@Api({tag: "Health API"})
@Controller({
    path: "health",
    version: VERSION_NEUTRAL,
})
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private memory: MemoryHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private readonly db: PrismaHealthIndicator,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) {}

    @ApiExcludeEndpoint()
    @Get()
    @HealthCheck()
    check() {
        // @formatter:off
        return this.health.check([
            () => this.db.pingCheck("database", this.prisma),
            () => this.disk.checkStorage("storage", {path: "/", thresholdPercent: 0.85}),
            () => this.memory.checkHeap("memory_heap", 1024 * 1024 * 1024), // Heap을 150MB -> 1024MB 변경
        ])
        // @formatter:on
    }

    @ApiBasicAuth("basic")
    @ApiAuth({basic: "basic", bearer: "token"})
    @Get("prisma")
    async prismaMetrics() {
        return this.prisma.$metrics.json()
    }

    @ApiBasicAuth("basic")
    @Post("config")
    async postConfigs() {
        // this.configService.
    }

    @ApiBasicAuth("basic")
    @Post("env")
    async postEnvs(@User() user: UserPayload) {
        if (!user) {
            throw new NotFoundException("Not Found")
        }
        return process.env
        // this.configService.
    }
}
