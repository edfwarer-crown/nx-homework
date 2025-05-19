import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  roleCode?: string;
  @ApiProperty({
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  roleTitle?: string;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  partnerUserRoles?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  userRoles?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  users?: Prisma.InputJsonValue;
}
