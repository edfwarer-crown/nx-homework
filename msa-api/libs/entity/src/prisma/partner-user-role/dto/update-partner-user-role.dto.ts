import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdatePartnerUserRoleDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  @IsOptional()
  @IsInt()
  groupId?: number;
  @ApiProperty({
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  roleId?: string;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  role?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  user?: Prisma.InputJsonValue;
}
