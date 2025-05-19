import {ApiProperty} from "@nestjs/swagger"

export class Attr {
    @ApiProperty({
        description: "업체코드",
    })
    vendorCode?: string

    @ApiProperty({
        description: "업체명",
    })
    vendorName?: string

    @ApiProperty({
        description: "상품코드",
    })
    productCode?: string
    // TODO 기획전 관련 어드민 기능이 생긴 후 사용
    // campaignTitle?: string // [아더마스] 알림장 배너
    // campaignCode?: string // random string 6
}

export class PluralHomeBannerDto {
    @ApiProperty({
        description: "배너코드",
    })
    code: string // banner code

    @ApiProperty({
        description: "이미지 url",
    })
    imageUrl: string // 소재 URL

    // TODO 기획전 관련 어드민 기능이 생긴 후 사용
    // impLink: string

    @ApiProperty({
        description: "배너 클릭시 이동 url",
    })
    clickLink: string

    @ApiProperty({
        description: "추적 url",
    })
    trackLink?: string

    @ApiProperty({
        description: "배너 타입",
    })
    type?: string

    @ApiProperty({
        description: "노출 시작일",
    })
    expoSd?: number

    @ApiProperty({
        description: "노출 종료일",
    })
    expoEd?: number

    @ApiProperty({
        description: "정렬순서",
    })
    sortOrder?: number

    @ApiProperty({
        description: "세부 내용",
    })
    attr?: Attr
}
