import { ApiProperty } from "@nestjs/swagger";

export class CustomerUserDetailEntity {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  token: string | null;
  @ApiProperty({
    type: "boolean",
  })
  migrated: boolean;
}
