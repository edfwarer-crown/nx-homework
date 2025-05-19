import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserMetaDto {
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
  key: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  value: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  valueType: string;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  user: Prisma.InputJsonValue;
}
