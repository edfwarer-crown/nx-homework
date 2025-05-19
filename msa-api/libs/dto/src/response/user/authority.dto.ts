import {ApiProperty} from "@nestjs/swagger"

export class AuthorityDto {
    @ApiProperty({
        type: "string",
    })
    code: string
}
