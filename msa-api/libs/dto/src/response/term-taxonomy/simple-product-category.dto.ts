import {ApiProperty} from "@nestjs/swagger"

export class SimpleProductCategoryDto {
    @ApiProperty({
        description: "카테고리 코드",
    })
    code: string

    @ApiProperty({
        description: "카테고리 명칭",
    })
    title: string

    @ApiProperty({
        description: "카테고리 뎁스",
    })
    depth: number
}
