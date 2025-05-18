import { ApiProperty } from "@nestjs/swagger";

export class TermTaxonomyDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  termTaxonomyId: number;
  @ApiProperty({
    type: "string",
  })
  taxonomy: string;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  description: string | null;
}
