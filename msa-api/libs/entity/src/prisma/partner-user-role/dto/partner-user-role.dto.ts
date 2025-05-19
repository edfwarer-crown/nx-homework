import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class PartnerUserRoleDto {
  @ApiProperty({
    type: "string",
  })
  id: string;
  @ApiProperty({
    type: "string",
  })
  userId: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  groupId: number;
  @ApiProperty({
    type: "string",
  })
  roleId: string;
  @ApiProperty({
    type: () => Object,
  })
  role: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  user: Prisma.JsonValue;
}
