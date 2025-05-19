import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class EventEntity {
  @ApiProperty({
    type: "string",
  })
  id: string;
  @ApiProperty({
    type: "string",
  })
  code: string;
  @ApiProperty({
    type: "string",
  })
  type: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  retailStart: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  retailEnd: Date | null;
  @ApiProperty({
    type: "boolean",
  })
  enabled: boolean;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  createdBy: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  lastModifiedBy: string | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  createdAt: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  lasstModifiedAt: Date | null;
  @ApiProperty({
    type: () => Object,
  })
  Compensation: Prisma.JsonValue;
}
