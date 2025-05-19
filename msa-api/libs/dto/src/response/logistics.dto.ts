import {ApiProperty} from "@nestjs/swagger"

export class LogisticsDto {
    @ApiProperty({
        description: "배송사 ID",
    })
    id: number

    @ApiProperty({
        description: "배송사 코드",
    })
    code: string

    @ApiProperty({
        description: "배송사명",
    })
    name: string

    @ApiProperty({
        description: "배송사 국가 코드",
    })
    countryCode?: string
}
