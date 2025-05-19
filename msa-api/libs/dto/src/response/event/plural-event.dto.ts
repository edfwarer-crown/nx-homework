import {ApiProperty} from "@nestjs/swagger"


export class PluralEventDto {
    @ApiProperty({
        description: "이벤트 ID",
    })
    id?: number | null

    @ApiProperty({
        description: "이벤트 코드",
    })
    code: string

    @ApiProperty({
        description: "이벤트 이름",
    })
    title: string | null

    @ApiProperty({
        description: "비주얼 파일. 4 x 3 비율 고정",
    })
    attachment: null

    @ApiProperty({
        description: "상세 비주얼 파일",
    })
    detailImage: null

    @ApiProperty({
        description: "정렬 순서",
    })
    sortOrder: number

    @ApiProperty({
        description: "노출 여부",
    })
    visible: boolean

    @ApiProperty({
        description: "이벤트 노출 시작일",
    })
    exposureStart: number

    @ApiProperty({
        description: "이벤트 노출 종료일",
    })
    exposureEnd: number
}
