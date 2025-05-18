import { ApiProperty } from "@nestjs/swagger";

export class CompensationDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
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
}
