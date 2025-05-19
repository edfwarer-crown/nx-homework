import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class TermDto {
  @ApiProperty({
    type: "string",
  })
  id: string;
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
    type: () => Object,
  })
  termTaxonomies: Prisma.JsonValue;
}
