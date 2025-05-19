import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConnectPartnerUserRoleDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
