import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
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
    default: "dbgenerated",
  })
  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}

@ApiExtraModels(UserCellNumberEnabledUniqueInputDto)
export class ConnectUserDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  id?: number;
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
