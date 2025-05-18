import { ApiProperty } from "@nestjs/swagger";
import { PartnerUserRoleEntity } from "../../partner-user-role/entities/partner-user-role.entity";
import { UserRoleEntity } from "../../user-role/entities/user-role.entity";
import { UserEntity } from "../../user/entities/user.entity";

export class RoleEntity {
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
  @ApiProperty({
    type: () => PartnerUserRoleEntity,
    isArray: true,
    required: false,
  })
  partnerUserRoles?: Partial<PartnerUserRoleEntity>[];
  @ApiProperty({
    type: () => UserRoleEntity,
    isArray: true,
    required: false,
  })
  userRoles?: Partial<UserRoleEntity>[];
  @ApiProperty({
    type: () => UserEntity,
    isArray: true,
    required: false,
  })
  users?: Partial<UserEntity>[];
}
