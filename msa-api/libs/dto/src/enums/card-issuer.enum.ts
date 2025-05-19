/**
 * Card Issuer : 신용카드 발급사 코드
 */

export enum CardIssuerEnum {
    BC_CARD = "01",
    SHINHAN_CARD = "02",
    SAMSUNG_CARD = "03",
    HYUNDAI_CARD = "04",
    LOTTE_CARD = "05",
    OVERSEAS_JCB_CARD = "06",
    KB_CARD = "07",
    HANA_CARD_FOREIGN_EXCHANGE = "08",
    OVERSEAS_CARD = "09",
    SUHYUP_CARD = "11",
    NONGHYUP_CARD = "12",
    HANMI_CARD = "13",
    CITI_CARD = "15",
    SHINHAN_CARD_ALT = "21",
    JEJU_CARD = "22",
    GWANGJU_CARD = "23",
    JEONBUK_CARD = "24",
    SHINHYEOP_CARD = "26",
    HANA_CARD = "27",
    SHINSEGAE_CARD = "30",
    WOORI_CARD = "31",
    PUREMI_CARD = "32",
    KUMJARAM_CARD = "33",
    ONNURI_GIFT_CERTIFICATE = "34",
    KONA_MONEY = "35",
    G_DREAM_CARD = "36",
    OVERSEAS_UNION_PAY_CARD = "37",
    LOTTE_AMEX = "38",
    OVERSEAS_AMEX = "39",
    OVERSEAS_DINERS = "40",
    OVERSEAS_DISCOVER = "41",
    OVERSEAS_VISA = "42",
    OVERSEAS_MASTER = "43",
}

export const TransposedCardIssuer: Record<string, string> = Object.entries(CardIssuerEnum).reduce(
    (acc, [key, value]) => {
        acc[value] = key
        return acc
    },
    {} as Record<string, string>,
)

const koreanTitles: Record<CardIssuerEnum, {title: string, code: string, type?: string}> = {
    [CardIssuerEnum.BC_CARD]: {title: "비씨카드", code: ""},
    [CardIssuerEnum.SHINHAN_CARD]: {title: "신한카드", code: ""},
    [CardIssuerEnum.SAMSUNG_CARD]: {title: "삼성카드", code: ""},
    [CardIssuerEnum.HYUNDAI_CARD]: {title: "현대카드", code: ""},
    [CardIssuerEnum.LOTTE_CARD]: {title: "롯데카드", code: ""},
    [CardIssuerEnum.OVERSEAS_JCB_CARD]: {title: "해외JCB카드", code: ""},
    [CardIssuerEnum.KB_CARD]: {title: "국민카드", code: ""},
    [CardIssuerEnum.HANA_CARD_FOREIGN_EXCHANGE]: {title: "하나카드(구외환)", code: ""},
    [CardIssuerEnum.OVERSEAS_CARD]: {title: "해외카드", code: ""},
    [CardIssuerEnum.SUHYUP_CARD]: {title: "수협카드", code: ""},
    [CardIssuerEnum.NONGHYUP_CARD]: {title: "농협카드", code: ""},
    [CardIssuerEnum.HANMI_CARD]: {title: "한미카드", code: ""},
    [CardIssuerEnum.CITI_CARD]: {title: "씨티카드", code: ""},
    [CardIssuerEnum.SHINHAN_CARD_ALT]: {title: "신한카드", code: ""},
    [CardIssuerEnum.JEJU_CARD]: {title: "제주카드", code: ""},
    [CardIssuerEnum.GWANGJU_CARD]: {title: "광주카드", code: ""},
    [CardIssuerEnum.JEONBUK_CARD]: {title: "전북카드", code: ""},
    [CardIssuerEnum.SHINHYEOP_CARD]: {title: "신협카드", code: ""},
    [CardIssuerEnum.HANA_CARD]: {title: "하나카드", code: ""},
    [CardIssuerEnum.SHINSEGAE_CARD]: {title: "신세계카드", code: ""},
    [CardIssuerEnum.WOORI_CARD]: {title: "우리카드", code: ""},
    [CardIssuerEnum.PUREMI_CARD]: {title: "푸르미카드", code: ""},
    [CardIssuerEnum.KUMJARAM_CARD]: {title: "꿈자람카드", code: ""},
    [CardIssuerEnum.ONNURI_GIFT_CERTIFICATE]: {title: "온누리상품권", code: ""},
    [CardIssuerEnum.KONA_MONEY]: {title: "코나머니(해피기프트카드)", code: ""},
    [CardIssuerEnum.G_DREAM_CARD]: {title: "지드림카드", code: ""},
    [CardIssuerEnum.OVERSEAS_UNION_PAY_CARD]: {title: "해외은련카드", code: ""},
    [CardIssuerEnum.LOTTE_AMEX]: {title: "롯데아멕스", code: ""},
    [CardIssuerEnum.OVERSEAS_AMEX]: {title: "해외아멕스", code: ""},
    [CardIssuerEnum.OVERSEAS_DINERS]: {title: "해외다이너스", code: ""},
    [CardIssuerEnum.OVERSEAS_DISCOVER]: {title: "해외디스커버", code: ""},
    [CardIssuerEnum.OVERSEAS_VISA]: {title: "해외VISA", code: ""},
    [CardIssuerEnum.OVERSEAS_MASTER]: {title: "해외MASTER", code: ""},
}

export function getCardIssuer(key: CardIssuerEnum): {title: string, code: string, type?: string} {
    return koreanTitles[key]
}
