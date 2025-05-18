import { ApiProperty } from "@nestjs/swagger";

export class DisplayEntity {
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
  title: string;
  @ApiProperty({
    type: "string",
  })
  platform: string;
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
