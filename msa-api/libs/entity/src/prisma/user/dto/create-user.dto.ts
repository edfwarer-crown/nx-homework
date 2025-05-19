import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  nickname?: string | null;
  @ApiProperty({
    type: "string",
    default: "en",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  language?: string | null;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  birthday?: Date | null;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  email?: string | null;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  lastPassword?: string | null;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  cellNumber?: string | null;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  profileImageId?: string | null;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  primaryRoleId: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
    default: 0,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  gender?: number | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    default: 0,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  authFailedCount?: number | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  lastSigned?: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  lastPasswordChanged?: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  lastNickChanged?: Date | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    default: 0,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  userAppStatus?: number | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    default: "now",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date | null;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  partnerUserDetails: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  partnerUserRoles: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  userRoles: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  UserMetas: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  Compensation: Prisma.InputJsonValue;
}
