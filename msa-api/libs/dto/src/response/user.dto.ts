import {ApiProperty} from "@nestjs/swagger"

import {RoleDto} from "@libs/dto/response/user/role.dto"

export class UserDto {
    username: string
    nickname: string
    fullname: string
}

export class PluralUserDto extends UserDto {
    @ApiProperty({
        description: "PK",
    })
    id: string
}

export class SingularUserDto extends PluralUserDto {
    @ApiProperty({
        description: "기본 계정 유형",
    })
    accountType: string

    @ApiProperty({
        description: "사용자의 소속",
        isArray: true,
        required: false,
    })
    organizations?: undefined

    @ApiProperty({
        description: "할당된 계정 역할",
        type: RoleDto,
        isArray: true,
    })
    roles: RoleDto[]
}
