import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class RoleEntity {
  @ApiProperty({
    type: "string",
  })
  id: string;
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
  @ApiProperty({
    type: () => Object,
  })
  partnerUserRoles: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  userRoles: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  users: Prisma.JsonValue;
}
