import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserMetaDto {
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
}
