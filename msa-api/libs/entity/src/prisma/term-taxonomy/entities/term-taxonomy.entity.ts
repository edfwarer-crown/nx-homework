import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class TermTaxonomyEntity {
  @ApiProperty({
    type: "string",
  })
  termTaxonomyId: string;
  @ApiProperty({
    type: "string",
  })
  termId: string;
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
    type: "string",
    nullable: true,
  })
  parent: string | null;
  @ApiProperty({
    type: () => Object,
  })
  term: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  parentTermTaxonomy: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  childTermTaxonomies: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  tag: Prisma.JsonValue;
}
