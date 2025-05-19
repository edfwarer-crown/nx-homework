import {ApiProperty} from "@nestjs/swagger"

export class UserPetDto {
    @ApiProperty({
        format: "int32",
        description: "user 아이디",
    })
    userId: number

    @ApiProperty({
        format: "int32",
        description: "pet 아이디",
    })
    petId: number

    @ApiProperty({
        format: "int32",
        description: "group 아이디",
    })
    groupId: number

    @ApiProperty({
        format: "string",
        description: "닉네임",
    })
    nickname: string

    @ApiProperty({
        format: "string",
        description: "보호자와 반려동물의 관계",
    })
    relationship: string

    @ApiProperty({
        format: "boolean",
        description: "대표 보호자 여부",
    })
    isPrimaryGuardian: boolean

    @ApiProperty({
        format: "boolean",
        description: "대표 반려동물 여부",
    })
    isPrimaryPet: boolean

    @ApiProperty({
        format: "boolean",
        description: "삭제 여부",
    })
    deleted: boolean

    @ApiProperty({
        format: "boolean",
        description: "보호자 삭제 여부",
    })
    guardianDeleted: boolean

    @ApiProperty({
        format: "date-time",
        description: "생성일",
    })
    createdAt: Date | null

    @ApiProperty({
        format: "date-time",
        description: "수정일",
    })
    lastModifiedAt: Date | null
}
