import {ApiProperty} from "@nestjs/swagger"
import {TermTaxonomyDto} from "./term-taxonomy.dto";


export class SpeciesDto extends TermTaxonomyDto {
    @ApiProperty({
        description: "품종 아이디",
    })
    id?: string

    @ApiProperty({
        description: "분류",
        example: "species",
    })
    taxonomy: string = "species"

    @ApiProperty({
        description: "품종명",
    })
    name?: string

    @ApiProperty({
        description: "상위 품종",
        required: false,
    })
    parent?: TermTaxonomyDto
}
