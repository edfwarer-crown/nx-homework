import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCompensationDto {
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  rewardDate?: Date | null;
  @ApiProperty({
    type: "string",
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  createdBy?: string | null;
  @ApiProperty({
    type: "string",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  lastModifiedBy?: string | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    default: "now",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date | null;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  events?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  users?: Prisma.InputJsonValue;
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  Event?: Prisma.InputJsonValue;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  eventId?: number | null;
}
