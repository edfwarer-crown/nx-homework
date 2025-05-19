import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePartnerUserRoleDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  @IsNotEmpty()
  @IsInt()
  groupId: number;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  roleId: string;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  role: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  user: Prisma.InputJsonValue;
}
