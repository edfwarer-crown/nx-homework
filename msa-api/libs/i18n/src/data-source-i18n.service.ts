import {Injectable} from "@nestjs/common"
import {I18nContext} from "nestjs-i18n"

@Injectable()
export class DataSourceI18nService {
    t(key: string, options?: Record<string, any>) {
        const lang = I18nContext.current().lang

        return ""
    }
}
