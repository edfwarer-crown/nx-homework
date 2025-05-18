import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UserRoleUserIdRoleIdUniqueInputDto {
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
  roleId: number;
}

@ApiExtraModels(UserRoleUserIdRoleIdUniqueInputDto)
export class ConnectUserRoleDto {
  @ApiProperty({
    type: UserRoleUserIdRoleIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserRoleUserIdRoleIdUniqueInputDto)
  userId_roleId: UserRoleUserIdRoleIdUniqueInputDto;
}
