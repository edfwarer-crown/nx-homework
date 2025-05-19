import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Inject,
    NotFoundException,
    NotImplementedException,
    Post,
    Put,
    Query,
    Version
} from "@nestjs/common"
import {VERSION_NEUTRAL} from "@nestjs/common/interfaces/version-options.interface"
import {ApiBody, ApiQuery} from "@nestjs/swagger"

import {UserConfigService} from "@apps/user/user/user-config.service"
import {UserService} from "@apps/user/user/user.service"
import {PlatformType} from "@libs/dto/enums"
import {LegacyUserConfigDto} from "@libs/dto/legacy-response/legacy-user-config.dto"
import {Api, Operation, User, UserPayload} from "@libs/utils/decorator"

@Api({tag: "유저 API"})
@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userConfigService: UserConfigService,
    ) {}

    @Operation({
        summary: "기기별 FCM 토큰 업데이트",
        description: "PP 접속 시 사용자 기기 정보 업데이트, [이관 소스] Project명: resource-server / End-Point: \"rest/user/messaging-token\" ",
    })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                platform: {
                    type: "string",
                    example: "PARTNER_APP",
                },
                token: {
                    type: "dueRuwIX00ujs...",
                },
                device: {
                    nullable: true,
                    type: "string",
                    example: "iPhone14,4",
                },
                os: {
                    nullable: true,
                    type: "string",
                    example: "iOS",
                },
                osVersion: {
                    nullable: true,
                    type: "string",
                    example: "18.2",
                },
                vendor: {
                    nullable: true,
                    type: "string",
                    example: "Apple",
                },
                version: {
                    type: "string",
                    example: "16",
                },
            },
        },
    })
    @Version(VERSION_NEUTRAL)
    @Put("rest/user/messaging-token")
    async putMessagingToken(
        @Body("vendor") vendor: string,
        @Body("device") device: string,
        @Body("os") os: string,
        @Body("osVersion") osVersion: string,
        @Body("token") token: string,
        @Body("version") version: string,
        @Body("platform") platform: PlatformType,
        @User() user: UserPayload,
    ) {
        if (platform === null) {
            platform = "PARTNER_APP"
        }
        if (token === null) {
            throw new BadRequestException("You've know")
        }
        const userIdCheck = await this.userService.existsById(user.userId + "")
        if (!userIdCheck) {
            throw new NotFoundException("User is not exists or not available.")
        }

        return true
    }

    @Operation({
        response: LegacyUserConfigDto,
        summary: "유저 설정 조회 - Migrated",
    })
    @Version(VERSION_NEUTRAL)
    @Get("/rest/user/config")
    async getUserConfig(@User() user: UserPayload, @Query("platform") platform: PlatformType) {
        return null
    }

    @Operation({
        response: Boolean,
        summary: "유저 설정 변경 - Migrated",
    })
    @Version(VERSION_NEUTRAL)
    @Put("/rest/user/config")
    async putUserConfig(@User() user: UserPayload, @Body() body: LegacyUserConfigDto) {
        return true
    }
}
