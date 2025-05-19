import {HttpModule} from "@nestjs/axios"
import {forwardRef, Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"
import {TerminusModule} from "@nestjs/terminus"

import {PrismaModule} from "@libs/core/modules/prisma.module"
import {HealthController} from "@libs/health/health.controller"
import {PrismaHealthIndicator} from "@libs/health/prisma.health-indicator"

@Module({
    imports: [
        forwardRef(() => PrismaModule),
        forwardRef(() => ConfigModule),
        TerminusModule.forRoot({
            errorLogStyle: "pretty",
        }),
        HttpModule,
    ],
    controllers: [HealthController],
    providers: [PrismaHealthIndicator],
})
export class HealthModule {}
