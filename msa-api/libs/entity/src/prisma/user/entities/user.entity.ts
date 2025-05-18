import { ApiProperty } from "@nestjs/swagger";
import { PartnerUserDetailEntity } from "../../partner-user-detail/entities/partner-user-detail.entity";
import { PartnerUserRoleEntity } from "../../partner-user-role/entities/partner-user-role.entity";
import { UserRoleEntity } from "../../user-role/entities/user-role.entity";
import { RoleEntity } from "../../role/entities/role.entity";
import { UserMetaEntity } from "../../user-meta/entities/user-meta.entity";
import { CompensationEntity } from "../../compensation/entities/compensation.entity";

export class UserEntity {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
  @ApiProperty({
    type: "string",
  })
  username: string;
  @ApiProperty({
    type: "string",
  })
  fullname: string;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  nickname: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  language: string | null;
  @ApiProperty({
    type: "string",
  })
  password: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  birthday: Date | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  email: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  lastPassword: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  cellNumber: string | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  profileImageId: number | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  primaryRoleId: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  gender: number | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  authFailedCount: number | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  lastSigned: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  lastPasswordChanged: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  lastNickChanged: Date | null;
  @ApiProperty({
    type: "boolean",
  })
  enabled: boolean;
  @ApiProperty({
    type: "boolean",
  })
  isDormant: boolean;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  userAppStatus: number | null;
  @ApiProperty({
    type: "boolean",
  })
  isAccountExpired: boolean;
  @ApiProperty({
    type: "boolean",
  })
  isAccountLocked: boolean;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  createdAt: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  lastModifiedAt: Date | null;
  @ApiProperty({
    type: () => PartnerUserDetailEntity,
    isArray: true,
    required: false,
  })
  partnerUserDetails?: Partial<PartnerUserDetailEntity>[];
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
    type: () => RoleEntity,
    required: false,
  })
  role?: Partial<RoleEntity>;
  @ApiProperty({
    type: () => UserMetaEntity,
    isArray: true,
    required: false,
  })
  UserMeta?: Partial<UserMetaEntity>[];
  @ApiProperty({
    type: () => CompensationEntity,
    isArray: true,
    required: false,
  })
  Compensation?: Partial<CompensationEntity>[];
}
