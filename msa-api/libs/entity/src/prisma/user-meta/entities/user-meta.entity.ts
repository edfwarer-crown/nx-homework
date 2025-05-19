import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UserMetaEntity {
  @ApiProperty({
    type: "string",
  })
  id: string;
  @ApiProperty({
    type: "string",
  })
  userId: string;
  @ApiProperty({
    type: "string",
  })
  key: string;
  @ApiProperty({
    type: "string",
  })
  value: string;
  @ApiProperty({
    type: "string",
  })
  valueType: string;
  @ApiProperty({
    type: () => Object,
  })
  user: Prisma.JsonValue;
}
