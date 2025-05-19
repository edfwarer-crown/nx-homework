import { ApiProperty } from "@nestjs/swagger";

export class CampaignDto {
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
  title: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  startDate: Date | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    nullable: true,
  })
  endDate: Date | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  sortOrder: number;
  @ApiProperty({
    type: "boolean",
  })
  visible: boolean;
  @ApiProperty({
    type: "boolean",
  })
  enable: boolean;
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
