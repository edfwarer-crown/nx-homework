import { ApiProperty } from "@nestjs/swagger";

export class CustomerUserDetailEntity {
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
