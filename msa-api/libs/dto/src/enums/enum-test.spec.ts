import {CardIssuerEnum, CardVendorEnum, enumFromStringValue, getCardIssuer, TransposedCardIssuer, TransposedCardVendor} from "@libs/dto/enums"

describe("Enum converting test", () => {
    it("Card Issuer", () => {
        const enumValue = enumFromStringValue(CardIssuerEnum, "27")
        const cardIssuer = TransposedCardIssuer[enumValue]
        const title = getCardIssuer(enumValue)
        console.log(`${enumValue} ${cardIssuer} ${title}`)
    })

    it("Card Vendor", () => {
        // const a = BankCode["01" as keyof typeof BankCode]
        const a: CardVendorEnum = enumFromStringValue(CardVendorEnum, "01")
        console.log(a === CardVendorEnum.BC)
        console.log(TransposedCardVendor[a])
    })
})
