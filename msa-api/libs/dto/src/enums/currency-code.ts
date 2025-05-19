export enum CurrencyCodeEnum {
    KRW = "KRW",
    USD = "USD",
    JPN = "JPN",
    EUR = "EUR",
    CAD = "CAD",
}

export type CurrencyCodeType = keyof typeof CurrencyCodeEnum
