import {ApiProperty} from "@nestjs/swagger"
import {Type} from "class-transformer"
import {Max, Min} from "class-validator"

export class DateRangeRequestDto {
    @ApiProperty({
        description: "시작일",
        example: "1741593877",
    })
    startDate: number

    @ApiProperty({
        description: "종료일",
        example: "1741593877",
    })
    endDate: number
}

export class PageRequestDto {
    @ApiProperty({
        format: "int32",
        description: "페이지. 시작은 0",
        example: 0,
    })
    @Min(0)
    @Type(() => Number)
    page: number

    @ApiProperty({
        format: "int32",
        description: "페이지당 아이템 개수. 최대 50개",
        example: 20,
    })
    @Type(() => Number)
    @Min(0)
    @Max(50)
    size: number

    /* @ApiProperty({
        format: "int32",
        description: "마지막 아이템의 PK (cursor 개념)",
        required: false,
        example: 36,
    })*/
    lastItem?: number

    constructor(page?: number, size?: number) {
        this.page = page ?? 0
        this.size = size ?? 20
    }

    pagination = (): {
        // cursor?: Prisma.AtLeast<{id?: number}, "id">
        take: number
        skip: number
    } => {
        // const hasCursor = !!this.lastItem

        return {
            skip: +this.page * +this.size,
            take: +this.size,
            // cursor: hasCursor ? {id: this.lastItem} : undefined,
        }
    }
}

export class PaginatedDto /* <T>*/ {
    @ApiProperty({
        description: "시작 페이지 여부",
    })
    isFirst: boolean

    @ApiProperty({
        description: "마지막 페이지 여부",
    })
    isLast: boolean

    @ApiProperty({
        format: "int32",
        description: "쿼리된 총 아이템 수",
    })
    totalElements: number

    @ApiProperty({
        format: "int32",
        description: "총 페이지 수",
    })
    totalPage: number

    // @ApiProperty({
    //     format: "int32",
    //     description: "콘텐츠",
    // })
    // content?: T | null

    @ApiProperty({
        format: "int32",
        description: "현재 페이지",
    })
    page: number

    @ApiProperty({
        format: "int32",
        description: "현재 페이지의 사이즈",
    })
    size: number
}

export class Page<T> {
    paging: PaginatedDto

    data: (T | Partial<T>)[]
}
