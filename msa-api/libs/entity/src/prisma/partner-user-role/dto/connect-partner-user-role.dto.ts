import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PartnerUserRoleUserIdGroupIdRoleIdUniqueInputDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  @IsNotEmpty()
  @IsInt()
  groupId: number;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  @IsNotEmpty()
  @IsInt()
  roleId: number;
}

@ApiExtraModels(PartnerUserRoleUserIdGroupIdRoleIdUniqueInputDto)
export class ConnectPartnerUserRoleDto {
  @ApiProperty({
    type: PartnerUserRoleUserIdGroupIdRoleIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PartnerUserRoleUserIdGroupIdRoleIdUniqueInputDto)
  userId_groupId_roleId: PartnerUserRoleUserIdGroupIdRoleIdUniqueInputDto;
}
