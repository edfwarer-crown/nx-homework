import {ApiProperty} from "@nestjs/swagger"

export class MgmtVersionDto {
    @ApiProperty({
        required: true,
        description: "모바일 앱 종류",
    })
    productType: string

    @ApiProperty({
        required: true,
        description: "버전",
    })
    versionNumber: string

    @ApiProperty({
        required: false,
        description: "배포 날짜",
    })
    releaseDate?: Date | null

    @ApiProperty({
        required: false,
        description: "설명",
    })
    description?: string

    @ApiProperty({
        required: false,
        description: "업데이트 노트 URL",
    })
    descriptionUrl?: string

    @ApiProperty({
        required: false,
        description: "활성화 여부",
    })
    isActive?: boolean

    @ApiProperty({
        required: false,
        description: "필수 업데이트 여부",
    })
    isMandatory?: boolean

    @ApiProperty({
        required: true,
        description: "생성일시",
    })
    createdAt: Date | null
}
