import {I18nAbstractLoader, I18nAbstractLoaderOptions} from "nestjs-i18n"

export class DataSourceI18nLoader extends I18nAbstractLoader {
    formatData(data: any): any {}

    getDefaultOptions(): Partial<I18nAbstractLoaderOptions> {
        return undefined
    }
}
