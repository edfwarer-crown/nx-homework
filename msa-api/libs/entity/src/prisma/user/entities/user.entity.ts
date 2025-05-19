import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
  @ApiProperty({
    type: "string",
  })
  id: string;
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
    type: "string",
    nullable: true,
  })
  profileImageId: string | null;
  @ApiProperty({
    type: "string",
  })
  primaryRoleId: string;
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
    type: () => Object,
  })
  partnerUserDetails: Prisma.JsonValue;
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
  UserMetas: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  Compensation: Prisma.JsonValue;
}
