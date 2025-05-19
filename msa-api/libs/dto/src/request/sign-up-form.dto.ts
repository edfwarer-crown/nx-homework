import {ApiProperty} from "@nestjs/swagger"
import {TermOfServiceType} from "../enums";


export class SignUpFormDto {
    @ApiProperty({
        example: "heyhey",
        description: "계정명",
    })
    username: string

    @ApiProperty({
        example: "010-1111-1111",
        examples: ["010-1111-1111", "+82 10-1111-1111"],
        description: "전화번호",
    })
    cellNumber: string

    @ApiProperty({
        example: "hello world",
        description: "평문 비밀번호",
    })
    password: string

    @ApiProperty({
        example: "TEST",
        description: "Iamport 인증키",
    })
    impUid: string

    @ApiProperty({
        enum: TermOfServiceType,
        required: false,
        isArray: true,
        examples: {
            U_INFORMATION: "이벤트 등 해택 / 정보 수신 동의(유저 앱)",
        },
        description: "약관 동의",
    })
    agreements: string[]

    @ApiProperty({
        example: "",
        type: "string",
        required: false,
        description: "초대 코드",
    })
    invitationCode: string

    @ApiProperty({
        example: "",
        type: "string",
        required: false,
        description: "암호화된 이메일(이메일 인증 성공 후 받은 return 값)",
    })
    email: string

    @ApiProperty({
        type: "string",
        required: false,
        description: "우편번호(주소 등록시)",
    })
    postal?: string

    @ApiProperty({
        type: "string",
        required: false,
        description: "주소1(주소 등록시)",
    })
    address1?: string

    @ApiProperty({
        type: "string",
        required: false,
        description: "주소2(주소 등록시)",
    })
    address2?: string

    // @ApiProperty({
    //     required: false,
    //     description: "gruopId",
    // })
    // groupId: number

    // @ApiProperty({
    //     required: false,
    //     description: "petId",
    // })
    // petId: number

    @ApiProperty({
        required: false,
        example: "USER",
        description: "계정 유형",
    })
    accountType: string

    // @ApiProperty({
    //     required: false,
    //     example: "",
    //     examples: {
    //         GroupToUser: "G2U",
    //         GroupToGroup: "G2G",
    //         UserToUser: "U2U",
    //     },
    //     description: "가입 유형",
    // })
    // refererType: string

    @ApiProperty({
        description: "MetaData",
        required: false,
    })
    meta?: {[key: string]: any}
}
