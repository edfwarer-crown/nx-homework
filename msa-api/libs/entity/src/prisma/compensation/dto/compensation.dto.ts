import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class CompensationDto {
  @ApiProperty({
    type: "string",
  })
  id: string;
  @ApiProperty({
    type: "boolean",
  })
  isRewarded: boolean;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  rewardDate: Date | null;
  @ApiProperty({
    type: "string",
  })
  status: string;
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
  events: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  users: Prisma.JsonValue;
  @ApiProperty({
    type: () => Object,
  })
  Event: Prisma.JsonValue;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  eventId: number | null;
}
