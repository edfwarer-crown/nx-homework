import { ApiProperty } from "@nestjs/swagger";
import { TermEntity } from "../../term/entities/term.entity";
import { TagEntity } from "../../tag/entities/tag.entity";

export class TermTaxonomyEntity {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  termTaxonomyId: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  termId: number;
  @ApiProperty({
    type: "string",
  })
  taxonomy: string;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  parent: number | null;
  @ApiProperty({
    type: () => TermEntity,
    required: false,
  })
  term?: Partial<TermEntity>;
  @ApiProperty({
    type: () => TermTaxonomyEntity,
    required: false,
    nullable: true,
  })
  parentTermTaxonomy?: Partial<TermTaxonomyEntity> | null;
  @ApiProperty({
    type: () => TermTaxonomyEntity,
    isArray: true,
    required: false,
  })
  childTermTaxonomies?: Partial<TermTaxonomyEntity>[];
  @ApiProperty({
    type: () => TagEntity,
    required: false,
    nullable: true,
  })
  tag?: Partial<TagEntity> | null;
}
