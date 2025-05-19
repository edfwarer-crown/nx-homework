import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  termTaxonomy: Prisma.InputJsonValue;
}
