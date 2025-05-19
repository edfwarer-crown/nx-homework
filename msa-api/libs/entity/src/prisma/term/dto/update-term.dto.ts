import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateTermDto {
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  termTaxonomies?: Prisma.InputJsonValue;
}
