import {ApiProperty} from "@nestjs/swagger"
import {AuthorityDto} from "./authority.dto";


export class RoleDto {
    @ApiProperty({
        type: "integer",
        format: "int32",
    })
    id: string

    // @ApiProperty({
    //     description: "System or Custom",
    //     enum: ["SYSTEM", "CUSTOM"],
    // })
    // type: string

    @ApiProperty({
        description: "Parent Type",
        type: "integer",
        format: "int32",
    })
    primaryType: string

    @ApiProperty({
        type: "string",
    })
    code: string

    @ApiProperty({
        type: "string",
    })
    title: string

    @ApiProperty({
        type: AuthorityDto,
        isArray: true,
    })
    authorities: AuthorityDto[]
}
