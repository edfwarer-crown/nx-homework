import {Controller, Get, HttpCode, HttpStatus, Inject, Param, Query} from "@nestjs/common"
import {ClientProxy} from "@nestjs/microservices"
import {ApiExtraModels, ApiOperation, ApiParam, ApiQuery, ApiResponse, getSchemaPath} from "@nestjs/swagger"
import {EventService} from "./event.service";
import {Api} from "../../../../libs/utils/src/decorator/common-api.decorator";
import {ApiAuth} from "../../../../libs/utils/src/decorator/api-auth.decorator";
import {ResponseDto} from "../../../../libs/utils/src";
import {PluralEventDto} from "../../../../libs/dto/src/response/event/plural-event.dto";
import {PluralHomeBannerDto} from "../../../../libs/dto/src/response/event/plural-home-banner.dto";
import {Operation} from "../../../../libs/utils/src/decorator/common-operation.decorator";
import {EventDto} from "../../../../libs/entity/src/prisma";

@Api({tag: "이벤트 API"})
@Controller()
export class EventController {
    constructor(
        private readonly eventService: EventService,
        @Inject("MICRO_SERVICE") private clientProxy: ClientProxy,
    ) {}

    @ApiAuth({basic: "basic", bearer: "token"})
    @ApiOperation({
        summary: "이벤트 리스트 조회",
        description: "`type`, `display`에 따른 이벤트 리스트 조회",
    })
    @ApiExtraModels(ResponseDto<PluralEventDto[]>, PluralEventDto)
    @ApiResponse({
        status: 200,
        schema: {
            allOf: [
                {$ref: getSchemaPath(ResponseDto<PluralHomeBannerDto[] | PluralEventDto[]>)},
                {
                    properties: {
                        data: {
                            type: "array",
                            items: {oneOf: [{$ref: getSchemaPath(PluralHomeBannerDto)}, {$ref: getSchemaPath(PluralEventDto)}]},
                        },
                    },
                },
            ],
        },
    })
    @ApiQuery({
        description: "이벤트 종류",
        name: "type",
        enum: [
            "MAIN",
            "BANNER",
            "POPUP",
        ],
    })
    @ApiQuery({
        description: "지면 코드",
        name: "display",
        type: "string",
        required: false,
    })
    @HttpCode(HttpStatus.OK)
    @Get("events")
    async getEvents(@Query("type") type: "MAIN" | "POPUP" | "BANNER", @Query("display") displayCode: "RSVN-NTC") {
        return this.eventService.getBanners(type, null, displayCode)
    }

    @Operation({
        response: EventDto,
        public: true,
        summary: "이벤트 상세 조회",
        description: "이벤트 상세",
    })
    @ApiParam({
        name: "code",
        description: "이벤트 코트",
        example: "962968",
    })
    @HttpCode(HttpStatus.OK)
    @Get("events/:code")
    async getEvent(@Param("code") code: string) {
        return this.eventService.getEvent(code)
    }

}
