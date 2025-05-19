import {JwtService} from "@nestjs/jwt"
import * as libPhoneNumber from "libphonenumber-js"

describe("number test", () => {
    let jwtService: JwtService
    it("", () => {
        const number1 = "010-000-1111"
        const parsePhoneNumbers = libPhoneNumber.parsePhoneNumberFromString(number1, "KR")
        console.log(parsePhoneNumbers)

        const nation1 = parsePhoneNumbers.formatNational()
        console.log(nation1)
        // const [
        //     partNumber1,
        //     partNumber2,
        //     partNumber3,
        // ] = nation1.split("-")
        // console.log(`${partNumber1}-${"*".repeat(partNumber2.length)}-${partNumber3}`)

        const number2 = "031-715-1111"
        const parsePhoneNumbers2 = libPhoneNumber.parsePhoneNumberFromString(number2, "KR")
        console.log(parsePhoneNumbers2)

        const nation2 = parsePhoneNumbers2.formatNational()
        console.log(nation2)

        // const [
        //     partNumber1,
        //     partNumber2,
        //     partNumber3,
        // ] = nation2.split("-")
        // console.log(`${partNumber1}-${"*".repeat(partNumber2.length)}-${partNumber3}`)

        const number3 = "+82 10 2505 4446"
        const parsePhoneNumbers3 = libPhoneNumber.parsePhoneNumberFromString(number3, "KR")
        console.log(parsePhoneNumbers3)

        const nation3 = parsePhoneNumbers3.formatNational()
        console.log(nation3)
        const [
            partNumber1,
            partNumber2,
            partNumber3,
        ] = nation3.split("-")
        console.log(`${partNumber1}-${"*".repeat(partNumber2.length)}-${partNumber3}`)
    })
})
