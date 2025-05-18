import { ApiProperty } from "@nestjs/swagger";

export class EventDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
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
}
