import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTermDto {
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  termTaxonomies: Prisma.InputJsonValue;
}
