import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  parentType: number;
  @ApiProperty({
    type: "string",
  })
  roleCode: string;
  @ApiProperty({
    type: "string",
  })
  roleTitle: string;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: "boolean",
  })
  locked: boolean;
}
