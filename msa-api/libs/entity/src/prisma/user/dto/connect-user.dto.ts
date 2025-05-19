import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class UserCellNumberEnabledUniqueInputDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  cellNumber: string;
  @ApiProperty({
    type: "boolean",
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}

@ApiExtraModels(UserCellNumberEnabledUniqueInputDto)
export class ConnectUserDto {
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  username?: string;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  email?: string;
  @ApiProperty({
    type: UserCellNumberEnabledUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserCellNumberEnabledUniqueInputDto)
  cellNumber_enabled?: UserCellNumberEnabledUniqueInputDto;
}
