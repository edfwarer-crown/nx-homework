import {ApiProperty} from "@nestjs/swagger"

export class ChangePasswordFormDto {
    @ApiProperty({
        description: "사용자 이름 유형",
        enum: ["USERNAME", "CELL_NUMBER"],
        example: "CELL_NUMBER",
    })
    type: "USERNAME" | "CELL_NUMBER"

    @ApiProperty({
        description: "사용자 계정 (사용자 이름)",
    })
    username: string

    @ApiProperty({
        description: "신규 비밀번호",
    })
    password: string

    @ApiProperty({
        description: "본인 인증 인증서 키. <strong>개발 테스트 시에는 TEST로 보내면 본인 인증에 대한 검증을 하지 않습니다.</strong>",
    })
    certKey: string

    @ApiProperty({
        description: "기존 비밀번호 (옵션)",
        required: false,
    })
    originPassword: string
}
