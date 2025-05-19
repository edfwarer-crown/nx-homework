import {ApiProperty} from "@nestjs/swagger"

import {AccountType, TermOfServiceType} from "@libs/dto/enums"

export class SignUpFormV1_1Dto {
    @ApiProperty({
        example: "username",
        required: false,
    })
    username: string

    @ApiProperty({
        example: "hello world",
        description: "평문 비밀번호",
    })
    password: string

    @ApiProperty({
        // enum: TermOfServiceType,
        required: true,
        isArray: true,
        type: "string",
        description: "약관 동의",
        example: ["U_INFORMATION", "U_MARKETING"],
    })

    agreements: string[]

    @ApiProperty({
        type: "string",
        required: false,
        description: "암호화된 cellNumber(기기 인증 성공 후 받은 return 값)",
    })
    cellNumber: string

    @ApiProperty({
        example: "",
        type: "string",
        required: false,
        description: "암호화된 이메일(이메일 인증 성공 후 받은 return 값)",
    })
    email?: string

    @ApiProperty({
        required: false,
        example: "USER",
        enum: AccountType,
        description: "계정 유형",
    })
    accountType: string

    @ApiProperty({
        enum: ["KAKAO", "APPLE"],
        required: false,
        description: "로그인 하는 플랫폼(kakao, apple)",
    })
    provider?: "KAKAO" | "APPLE" | null

    @ApiProperty({
        required: false,
        description: "`provider`에서 제공한 유저의 고유 아이디",
    })
    idToken?: string

    @ApiProperty({
        example: "",
        type: "string",
        required: false,
        description: "초대 코드",
    })
    invitationCode?: string

    @ApiProperty({
        description: "MetaData",
        required: false,
    })
    meta?: {[key: string]: any}
}
