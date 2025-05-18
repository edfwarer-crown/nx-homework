import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateDisplayDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  code: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  platform: string;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  createdBy?: string | null;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  lastModifiedBy?: string | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    default: "now",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date | null;
}
