import { ApiProperty } from "@nestjs/swagger";

export class MessageBundleDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
  @ApiProperty({
    type: "string",
  })
  languageCode: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  version: number;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  messageCode: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  messageTitle: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  messageContent: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  messageDescription: string | null;
  @ApiProperty({
    type: "boolean",
  })
  deleted: boolean;
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
  lastModifiedAt: Date | null;
}
