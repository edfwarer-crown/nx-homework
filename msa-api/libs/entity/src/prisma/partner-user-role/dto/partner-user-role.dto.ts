import { ApiProperty } from "@nestjs/swagger";

export class PartnerUserRoleDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  groupId: number;
}
