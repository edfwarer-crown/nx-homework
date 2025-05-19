import {ApiProperty} from "@nestjs/swagger"
import {IsNotEmpty} from "class-validator"

export class SignInFormDto {
    @ApiProperty({
        description: "사용자 이름 유형",
        enum: ["USERNAME", "CELL_NUMBER"],
        example: "CELL_NUMBER",
    })
    type: "USERNAME" | "CELL_NUMBER"

    @ApiProperty({
        description: "사용자 이름",
    })
    @IsNotEmpty()
    username: string

    @ApiProperty({
        description: "비밀번호",
    })
    @IsNotEmpty()
    password: string
}
