import { ApiProperty } from "@nestjs/swagger";

export class PartnerUserDetailDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  id: number;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  token: string | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  profileImageId: number | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  groupId: number;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  jobTitle: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  color: string | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    nullable: true,
  })
  bankAccountId: number | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  workingCellNumber: string | null;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  nickname: string | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  flag: number;
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
