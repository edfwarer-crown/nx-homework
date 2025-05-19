import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class TermTaxonomyTermIdTaxonomyParentUniqueInputDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  termId: string;
  @ApiProperty({
    type: "string",
    default: "",
  })
  @IsNotEmpty()
  @IsString()
  taxonomy: string;
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  parent: string;
}

@ApiExtraModels(TermTaxonomyTermIdTaxonomyParentUniqueInputDto)
export class ConnectTermTaxonomyDto {
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  termTaxonomyId?: string;
  @ApiProperty({
    type: TermTaxonomyTermIdTaxonomyParentUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TermTaxonomyTermIdTaxonomyParentUniqueInputDto)
  termId_taxonomy_parent?: TermTaxonomyTermIdTaxonomyParentUniqueInputDto;
}
