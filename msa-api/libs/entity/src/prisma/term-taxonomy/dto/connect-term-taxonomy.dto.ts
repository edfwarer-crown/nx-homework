import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class TermTaxonomyTermIdTaxonomyParentUniqueInputDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
    default: 0,
  })
  @IsNotEmpty()
  @IsInt()
  termId: number;
  @ApiProperty({
    type: "string",
    default: "",
  })
  @IsNotEmpty()
  @IsString()
  taxonomy: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  @IsNotEmpty()
  @IsInt()
  parent: number;
}

@ApiExtraModels(TermTaxonomyTermIdTaxonomyParentUniqueInputDto)
export class ConnectTermTaxonomyDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  termTaxonomyId?: number;
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
