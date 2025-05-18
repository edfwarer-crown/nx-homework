import { ApiProperty } from "@nestjs/swagger";
import { TermTaxonomyEntity } from "../../term-taxonomy/entities/term-taxonomy.entity";

export class TermEntity {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
  @ApiProperty({
    type: "string",
  })
  name: string;
  @ApiProperty({
    type: "string",
  })
  slug: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  termGroup: number;
  @ApiProperty({
    type: () => TermTaxonomyEntity,
    isArray: true,
    required: false,
  })
  termTaxonomies?: Partial<TermTaxonomyEntity>[];
}
