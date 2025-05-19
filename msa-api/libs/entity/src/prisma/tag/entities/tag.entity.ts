import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class TagEntity {
  @ApiProperty({
    type: "string",
  })
  termTaxonomyId: string;
  @ApiProperty({
    type: () => Object,
  })
  termTaxonomy: Prisma.JsonValue;
}
