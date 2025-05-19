import {ApiProperty} from "@nestjs/swagger"

export class SignOutFormDto {
    @ApiProperty({
        description: "모든 디바이스에서 로그아웃이 필요할 경우 `true`",
        required: false,
    })
    logoutAll?: boolean

    @ApiProperty({
        description: "현재 디바이스 메시징 토큰",
        required: true,
    })
    currentToken: string
}
