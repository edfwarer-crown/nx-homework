import {ApiProperty} from "@nestjs/swagger"

export class FilterValueDto {
    @ApiProperty({
        description: "적용되는 필터 코드. 단 카테고리는 ct",
    })
    c: string

    @ApiProperty({
        description: "적용하는 필터 실제 값. 여러개일 경우 \`,\`로 조인해서 문자열로 요청",
    })
    v: string
}
