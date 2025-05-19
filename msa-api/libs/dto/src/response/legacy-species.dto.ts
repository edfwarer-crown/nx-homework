import {ApiProperty} from "@nestjs/swagger"

/**
 * 임시 품종 dto
 * pp pet model 변경 후 제거 예정
 */
export class LegacySpeciesDto {
    @ApiProperty({
        description: "품종 아이디",
    })
    id?: number

    @ApiProperty({
        description: "품종명",
    })
    name?: string

    @ApiProperty({
        description: "상위 품종 아이디",
        required: false,
    })
    speciesTypeId?: number

    @ApiProperty({
        description: "상위 품종명",
        required: false,
    })
    speciesType?: string
}
