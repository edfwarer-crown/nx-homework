import {ApiProperty} from "@nestjs/swagger"

export class TermTaxonomyDto {
    @ApiProperty({
        description: "Taxonomy Id",
    })
    id?: string

    @ApiProperty({
        description: "분류",
    })
    taxonomy?: string

    @ApiProperty({
        description: "이름",
    })
    name?: string

    @ApiProperty({
        description: "상위 Taxonomy",
        required: false,
    })
    parent?: TermTaxonomyDto
}
