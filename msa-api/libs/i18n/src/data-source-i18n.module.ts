import {Module} from "@nestjs/common"
import {DataSourceI18nService} from "./data-source-i18n.service";


@Module({
    providers: [DataSourceI18nService],
    exports: [DataSourceI18nService],
})
export class DataSourceI18nModule {}
