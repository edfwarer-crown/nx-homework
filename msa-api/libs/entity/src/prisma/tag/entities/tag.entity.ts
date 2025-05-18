import { ApiProperty } from "@nestjs/swagger";
import { TermTaxonomyEntity } from "../../term-taxonomy/entities/term-taxonomy.entity";

export class TagEntity {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  termTaxonomyId: number;
  @ApiProperty({
    type: () => TermTaxonomyEntity,
    required: false,
  })
  termTaxonomy?: Partial<TermTaxonomyEntity>;
}
