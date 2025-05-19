import {ApiProperty} from "@nestjs/swagger"
import {getAlpha3Codes} from "i18n-iso-countries"
import {ApiBooleanPropertyDecorator} from "../../utils/src/decorator/api-boolean-property.decorator";
import {Platform, PlatformType} from "./enums/platform-type.enum";


export class CellNumberCheckRequestDto {
    @ApiProperty({
        description: "휴대전화번호",
        example: "010-0000-0000",
        examples: ["010-0000-0000", "000-000-000"],
    })
    cellNumber: string

    @ApiProperty({
        type: "string",
        description: `<a href="https://www.iso.org/iso-3166-country-codes.html">ISO 3166-1</a> A-3 코드 혹은 국가번호만 허용합니다. <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes">See more</a>`,
        example: "KOR",
        examples: [Object.keys(getAlpha3Codes())],
        required: false,
    })
    country: string | number
}

export class CellNumberCheckResponseDto {
    @ApiBooleanPropertyDecorator({
        description: "사용 가능",
        example: "true/false",
    })
    available: boolean

    @ApiProperty({
        enum: Platform,
        enumName: "PlatformType",
        isArray: true,
        description: "현재 가입 되어있는 플랫폼",
        example: Platform.PARTNER_WEB,
    })
    platforms: PlatformType[]
}
