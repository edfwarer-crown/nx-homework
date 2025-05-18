import { ApiProperty } from "@nestjs/swagger";

export class TermDto {
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
}
