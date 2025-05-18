import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "../../role/entities/role.entity";
import { UserEntity } from "../../user/entities/user.entity";

export class PartnerUserRoleEntity {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  userId: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  groupId: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  roleId: number;
  @ApiProperty({
    type: () => RoleEntity,
    required: false,
  })
  role?: Partial<RoleEntity>;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  user?: Partial<UserEntity>;
}
