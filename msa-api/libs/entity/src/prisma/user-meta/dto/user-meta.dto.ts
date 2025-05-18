import { ApiProperty } from "@nestjs/swagger";

export class UserMetaDto {
  @ApiProperty({
    type: "string",
  })
  key: string;
  @ApiProperty({
    type: "string",
  })
  value: string;
  @ApiProperty({
    type: "string",
  })
  valueType: string;
}
