import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../user/entities/user.entity";

export class UserMetaEntity {
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  userId: number;
  @ApiProperty({
    type: "string",
  })
  key: string;
  @ApiProperty({
    type: "string",
  })
  value: string;
  @ApiProperty({
    type: "string",
  })
  valueType: string;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
  })
  user?: Partial<UserEntity>;
}
