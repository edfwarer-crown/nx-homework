import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UserMetaUserIdKeyUniqueInputDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  key: string;
}

@ApiExtraModels(UserMetaUserIdKeyUniqueInputDto)
export class ConnectUserMetaDto {
  @ApiProperty({
    type: UserMetaUserIdKeyUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserMetaUserIdKeyUniqueInputDto)
  userId_key: UserMetaUserIdKeyUniqueInputDto;
}
