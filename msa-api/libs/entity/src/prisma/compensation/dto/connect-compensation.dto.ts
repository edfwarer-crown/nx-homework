import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConnectCompensationDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
