import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateTagDto {
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  termTaxonomy?: Prisma.InputJsonValue;
}
