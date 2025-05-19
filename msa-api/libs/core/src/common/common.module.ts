import {forwardRef, Module} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {CashifyModule} from "nestjs-cashify"

import {CashifyConfigService} from "@libs/core/common/service/cashify-config.service"
import {PrismaModule} from "@libs/core/modules/prisma.module"

@Module({
    imports: [
        forwardRef(() => PrismaModule),
        CashifyModule.forRootAsync({
            useClass: CashifyConfigService,
            extraProviders: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [
    ],
    exports: [
    ],
})
export class CommonModule {}
