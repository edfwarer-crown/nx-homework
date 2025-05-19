import {ApiProperty} from "@nestjs/swagger"

export class NameIntValueDto {
    @ApiProperty({
        description: "명칭",
    })
    name: string

    @ApiProperty({
        description: "값",
        example: 123,
    })
    value: number
}

export class NameStringCodeDto {
    @ApiProperty({
        description: "명칭",
    })
    name: string

    @ApiProperty({
        description: "값",
        example: "123",
    })
    code: string
}
