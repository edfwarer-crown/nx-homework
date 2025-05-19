import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTermTaxonomyDto {
  @ApiProperty({
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  termId?: string;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  parent?: string | null;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  term?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  parentTermTaxonomy?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  childTermTaxonomies?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  tag?: Prisma.InputJsonValue;
}
