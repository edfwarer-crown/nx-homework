import {HttpModule} from "@nestjs/axios"
import {forwardRef, Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"
import {PrismaHealthIndicator, TerminusModule} from "@nestjs/terminus"
import {PrismaModule} from "../../core/src/modules/prisma.module";
import {HealthController} from "./health.controller";


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
