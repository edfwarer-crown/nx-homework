import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class MessageBundleLanguageCodeMessageCodeUniqueInputDto {
  @ApiProperty({
    type: "string",
    default: "ko",
  })
  @IsNotEmpty()
  @IsString()
  languageCode: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  messageCode: string;
}

@ApiExtraModels(MessageBundleLanguageCodeMessageCodeUniqueInputDto)
export class ConnectMessageBundleDto {
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
  messageCode?: string;
  @ApiProperty({
    type: MessageBundleLanguageCodeMessageCodeUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MessageBundleLanguageCodeMessageCodeUniqueInputDto)
  languageCode_messageCode?: MessageBundleLanguageCodeMessageCodeUniqueInputDto;
}
