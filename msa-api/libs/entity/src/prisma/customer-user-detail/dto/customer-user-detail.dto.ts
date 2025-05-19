import { ApiProperty } from "@nestjs/swagger";

export class CustomerUserDetailDto {
  @ApiProperty({
    type: "string",
  })
  id: string;
  @ApiProperty({
    type: "string",
    nullable: true,
  })
  token: string | null;
  @ApiProperty({
    type: "boolean",
  })
  migrated: boolean;
}
