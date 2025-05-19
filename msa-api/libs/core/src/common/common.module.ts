import {forwardRef, Module} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {CashifyModule} from "nestjs-cashify"
import {CashifyConfigService} from "./service/cashify-config.service";
import {PrismaModule} from "../modules/prisma.module";


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
