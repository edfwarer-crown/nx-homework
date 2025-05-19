/**
 * Card Vendor : 요청 카드사 코드
 */

export enum CardVendorEnum {
    BC = "01",
    SHINHAN = "02",
    SAMSUNG = "03",
    HYUNDAI = "04",
    LOTTE = "05",
    KB = "07",
    HANA = "08",
    SUHYUP = "11",
    NONGHYUP = "12",
    CITI = "15",
    WOORI = "20",
    JEJU = "22",
    KWANGJU = "23",
    JEONBUK = "24",
    SANEOP = "25",
    SHINHYUP = "26",
    SAEMAEUL = "28",
    KAKAO = "31",
    KONA = "34",
    TOSS = "39",
    SAMSUNGPAY = "SP",
    KAKAOPAY = "KP",
    PAYCO = "PC",
    VISA = "AV",
    MASTER = "AM",
    JCB = "AJ",
    NAVERPAY = "NP",
    APPLEPAY = "AP",
}

const CardVendorDetails: Record<CardVendorEnum, {title: string, code: string, type: string}> = {
    [CardVendorEnum.BC]: {title: "비씨", code: "01", type: "01"},
    [CardVendorEnum.SHINHAN]: {title: "신한", code: "02", type: "01"},
    [CardVendorEnum.SAMSUNG]: {title: "삼성", code: "03", type: "01"},
    [CardVendorEnum.HYUNDAI]: {title: "현대", code: "04", type: "01"},
    [CardVendorEnum.LOTTE]: {title: "롯데", code: "05", type: "01"},
    [CardVendorEnum.KB]: {title: "국민", code: "07", type: "01"},
    [CardVendorEnum.HANA]: {title: "하나", code: "08", type: "01"},
    [CardVendorEnum.SUHYUP]: {title: "수협", code: "11", type: "01"},
    [CardVendorEnum.NONGHYUP]: {title: "농협", code: "12", type: "01"},
    [CardVendorEnum.CITI]: {title: "씨티", code: "15", type: "01"},
    [CardVendorEnum.WOORI]: {title: "우리", code: "20", type: "01"},
    [CardVendorEnum.JEJU]: {title: "제주", code: "22", type: "01"},
    [CardVendorEnum.KWANGJU]: {title: "광주", code: "23", type: "01"},
    [CardVendorEnum.JEONBUK]: {title: "전북", code: "24", type: "01"},
    [CardVendorEnum.SANEOP]: {title: "산업", code: "25", type: "01"},
    [CardVendorEnum.SHINHYUP]: {title: "신협", code: "26", type: "01"},
    [CardVendorEnum.SAEMAEUL]: {title: "새마을", code: "28", type: "01"},
    [CardVendorEnum.KAKAO]: {title: "카카오", code: "31", type: "01"},
    [CardVendorEnum.KONA]: {title: "코나", code: "34", type: "01"},
    [CardVendorEnum.TOSS]: {title: "토스", code: "39", type: "00"},
    [CardVendorEnum.SAMSUNGPAY]: {title: "삼성페이", code: "SP", type: "00"},
    [CardVendorEnum.KAKAOPAY]: {title: "카카오페이", code: "KP", type: "00"},
    [CardVendorEnum.PAYCO]: {title: "PAYCO", code: "PC", type: "00"},
    [CardVendorEnum.VISA]: {title: "VISA", code: "AV", type: "00"},
    [CardVendorEnum.MASTER]: {title: "MASTER", code: "AM", type: "00"},
    [CardVendorEnum.JCB]: {title: "JCB", code: "AJ", type: "00"},
    [CardVendorEnum.NAVERPAY]: {title: "네이버페이", code: "NP", type: "00"},
    [CardVendorEnum.APPLEPAY]: {title: "애플페이", code: "AP", type: "00"},
}

export const TransposedCardVendor: Record<string, string> = Object.entries(CardVendorEnum).reduce(
    (acc, [key, value]) => {
        acc[value] = key
        return acc
    },
    {} as Record<string, string>,
)

// Utility function to get details by BankCode
export function getCardVendor(bankCode: CardVendorEnum): {title: string, code: string, type: string} {
    return CardVendorDetails[bankCode]
}

export function getCardVendorDetails() {
    return Object.values(CardVendorDetails)
}
