import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTermTaxonomyDto {
  @ApiProperty({
    type: "string",
  })
  @IsNotEmpty()
  @IsString()
  termId: string;
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
  })
  @IsNotEmpty()
  term: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  parentTermTaxonomy: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  childTermTaxonomies: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  tag: Prisma.InputJsonValue;
}
