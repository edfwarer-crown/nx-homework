import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class UserMetaUserIdKeyUniqueInputDto {
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
}

@ApiExtraModels(UserMetaUserIdKeyUniqueInputDto)
export class ConnectUserMetaDto {
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: UserMetaUserIdKeyUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserMetaUserIdKeyUniqueInputDto)
  userId_key?: UserMetaUserIdKeyUniqueInputDto;
}
