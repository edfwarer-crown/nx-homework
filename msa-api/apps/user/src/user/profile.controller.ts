import {BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query} from "@nestjs/common"
import {ApiBody, ApiParam, ApiQuery} from "@nestjs/swagger"
import {UserService} from "./user.service";
import {Api} from "../../../../libs/utils/src/decorator/common-api.decorator";
import {Operation} from "../../../../libs/utils/src/decorator/common-operation.decorator";
import {ProfileDto} from "../../../../libs/dto/src/response/profile.dto";
import {User, UserPayload} from "../../../../libs/utils/src/decorator/user.decorator";
import {UserEntity} from "../../../../libs/entity/src/prisma";
import {UpdateUserProfileDto} from "../../../../libs/dto/src/request/update-user-profile.dto";


@Api({tag: "유저 API - 프로필"})
@Controller()
export class ProfileController {
    constructor(private readonly userService: UserService) {}

    @Operation({
        response: ProfileDto,
        summary: "프로필 조회",
        description: "현재 계정에 대한 회원 정보",
    })
    @Get("profile")
    async getProfile(@User() user: UserPayload) {
        const dbUser: Partial<UserEntity> = await this.userService.getOneById(user.userId + "")
        if (!dbUser) {
            throw new NotFoundException("USER_NOT_FOUND")
        }
        const {id, username, nickname, fullname, cellNumber, email, birthday} = dbUser
        return {
            id: id,
            username,
            nickname,
            fullname,
            cellNumber,
            email: email || null,
            signedDate: dbUser.createdAt?.toISOString() || null,
            birthday: (birthday && birthday.toISOString().split("T")[0]) || null,
        } as ProfileDto
    }

    @Operation({
        response: ProfileDto,
        summary: "프로필 수정",
        description: "현재 인증된 사용자의 정보 업데이트",
    })
    @ApiBody({
        type: () => UpdateUserProfileDto,
    })
    @Put("profile")
    async putProfile(@User() user: UserPayload, @Body() body: UpdateUserProfileDto) {
        return await this.userService.updateByUserId(user.userId + "", body).then((entity) => {
            return {
                username: entity.username,
                nickname: entity.nickname,
                fullname: entity.fullname,
                cellNumber: entity.cellNumber,
                email: entity.email,
                signedDate: entity.createdAt?.toISOString() || null,
                birthday: (entity.birthday && entity.birthday.toISOString().split("T")[0]) || null,
            } as ProfileDto
        })
    }

    @Operation({
        response: Boolean,
        public: true,
        auth: false,
        summary: "프로필 변경 데이터 중복 체크",
        description: "기존에 있는 지 체크. true면 중복되는 데이터가 있음",
    })
    @ApiQuery({
        name: "data",
        description: "확인하고자 하는 데이터. 사용자이름, 닉네임, 전화번호(한국의 휴대전화 번호만 가능), 이메일",
    })
    @ApiParam({
        name: "type",
        enum: [
            "USERNAME",
            "NICKNAME",
            "CELL_NUMBER",
            "EMAIL",
        ],
        description: "확인하고자 하는 데이터의 유형",
    })
    @HttpCode(HttpStatus.OK)
    @Post("profile/:type/check-duplicate")
    postCheckDuplicate(@Param("type") type: "USERNAME" | "NICKNAME" | "CELL_NUMBER", @Query() query: {data: string}) {
        if (type === "USERNAME") {
            return this.userService.checkDuplicate({username: query.data})
        }

        if (type === "NICKNAME") {
            return this.userService.checkDuplicate({nickname: query.data})
        }

        if (type === "CELL_NUMBER") {
            return this.userService.checkDuplicate({cellNumber: query.data})
        }

        if (type === "EMAIL") {
            return this.userService.checkDuplicate({email: query.data})
        }

        throw new BadRequestException("Unsupported type")
    }
}
