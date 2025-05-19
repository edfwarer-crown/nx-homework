import {ApiProperty, PickType} from "@nestjs/swagger"

export class ProfileDto {
    @ApiProperty({
        type: "string",
        description: "사용자 PK 추후. 폐기해야됨",
    })
    id: string

    @ApiProperty({
        type: "string",
        description: "사용자 이름",
    })
    username: string

    @ApiProperty({
        type: "string",
        description: "실명",
    })
    fullname: string

    @ApiProperty({
        type: "string",
        description: "닉네임 (현재 사용 안함)",
    })
    nickname: string

    @ApiProperty({
        type: "string",
        description: "전화번호",
    })
    cellNumber: string

    @ApiProperty({
        type: "string",
        format: "email",
        description: "이메일 주소",
    })
    email: string | null

    @ApiProperty({
        type: "string",
        format: "string",
        description: "yyyy-MM-dd",
    })
    birthday: string

    @ApiProperty({
        type: "string",
        description: "가입일",
    })
    signedDate: string
}

export class SimpleProfileDto extends PickType(ProfileDto, [
    "cellNumber",
    "email",
] as const) {}
