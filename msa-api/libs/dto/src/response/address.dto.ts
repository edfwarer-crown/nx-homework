import {ApiProperty} from "@nestjs/swagger"

export class AddressDto {
    @ApiProperty({
        type: "string",
        description: "우편번호",
        example: "04789",
    })
    postal?: string

    @ApiProperty({
        type: "string",
        description: "도로명 주소",
        example: "서울 성동구 왕십리로 130 10층",
    })
    street?: string

    @ApiProperty({
        type: "string",
        description: "지번 주소",
        example: "서울 성동구 성수동1가 656-53",
    })
    landLot?: string

    @ApiProperty({
        type: "number",
        description: "WGS 84 경도",
        example: "127.0447322",
    })
    longitude?: number

    @ApiProperty({
        type: "number",
        description: "WGS 84 위도",
        example: "37.5491967",
    })
    latitude?: number
}
