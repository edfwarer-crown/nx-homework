import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserRoleDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
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
