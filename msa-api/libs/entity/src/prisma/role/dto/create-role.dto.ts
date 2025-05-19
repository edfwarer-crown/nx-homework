import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  roleCode: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  roleTitle: string;
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
  users: Prisma.InputJsonValue;
}
