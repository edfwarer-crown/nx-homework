import {ZonedDateTime, ZoneId} from "@js-joda/core"
import "@js-joda/timezone"
import {Injectable, Logger, NotFoundException} from "@nestjs/common"
import {ApiProperty} from "@nestjs/swagger"
import axios from "axios"
import {arrayNotEmpty} from "class-validator"
import {PrismaService} from "../../../../libs/entity/src/prisma.service";
import {PluralHomeBannerDto} from "../../../../libs/dto/src/response/event/plural-home-banner.dto";
import {PluralEventDto} from "../../../../libs/dto/src/response/event/plural-event.dto";
import {EventDto} from "../../../../libs/entity/src/prisma";


class Attr {
    @ApiProperty({
        description: "업체코드",
    })
    vendorCode?: string

    @ApiProperty({
        description: "업체명",
    })
    vendorName?: string

    @ApiProperty({
        description: "상품코드",
    })
    productCode?: string;

    [key: string]: any;
}

class JsonEvent {
    @ApiProperty({
        description: "이벤트 ID",
    })
    id?: number | null

    @ApiProperty({
        description: "이벤트 코드",
    })
    code: string

    @ApiProperty({
        description: "이벤트 이름",
    })
    title: string | null

    type: string

    display: string

    attachment?: null

    detailImage?: null

    exposureStart?: number

    exposureEnd?: number

    clickLink: string | null

    trackLink: string | null

    @ApiProperty({
        description: "세부 내용",
    })
    attr?: Attr

    @ApiProperty({
        description: "정렬순서",
    })
    sortOrder?: number

    @ApiProperty({
        description: "노출 여부",
    })
    visible: boolean

    @ApiProperty({
        description: "노출 여부",
    })
    productIds?: number[]
}

@Injectable()
export class EventService {
    private readonly logger = new Logger(EventService.name)

    private data: JsonEvent[]
    private readonly cdnUrl: string

    constructor(
        private readonly prisma: PrismaService,
    ) {
    }

    async getBanners(
        type: "MAIN" | "POPUP" | "BANNER",
        platform?: string,
        display?: string,
    ): Promise<PluralHomeBannerDto[] | PluralEventDto[]> {
        const now = Math.floor(Date.now() / 1000)
        const db = await this.getEventData()

        // display = "RSVN-NTC" | "MAIN-BANNER"
        switch (type) {
            case "MAIN": {
                return (
                    db
                        .filter((event) => {
                            return (
                                event.type === "MAIN"
                                && event.visible
                                && event.exposureStart < now
                                && event.exposureEnd > now
                            )
                        })
                        ?.map((event) => {
                            return {
                                code: event.code,
                                title: event.title,
                                attachment: event.attachment,
                                sortOrder: event.sortOrder,
                            } as PluralEventDto
                        })
                        ?.sort((a, b) => a.sortOrder - b.sortOrder) ?? []
                )
            }

            case "BANNER": {
                return (
                    db
                        .filter((event) => {
                            return (
                                event.type === "BANNER"
                                && event.display === display
                                && event.exposureStart < now
                                && event.exposureEnd > now
                            )
                        })
                        ?.map((event) => {
                            return {
                                code: event.code,
                                imageUrl: null,
                                clickLink: event.clickLink,
                                trackLink: event.trackLink,
                                attr: event.attr,
                            } as PluralHomeBannerDto
                        })
                        ?.sort((a, b) => a.sortOrder - b.sortOrder) ?? []
                )
            }

            case "POPUP": {
                return (
                    db
                        .filter((event) => {
                            return (
                                event.type === "POPUP"
                                && event.display === display
                                && event.exposureStart < now
                                && event.exposureEnd > now
                            )
                        })
                        ?.map((event) => {
                            return {
                                code: event.code,
                                title: event.title,
                                attachment: event.attachment,
                                sortOrder: event.sortOrder,
                            } as PluralEventDto
                        })
                        ?.sort((a, b) => a.sortOrder - b.sortOrder) ?? []
                )
            }
        }
        return []
    }

    async getEvent(code: string): Promise<EventDto | PluralHomeBannerDto> {
        const db = await this.getEventData()
        const event = db.find((item) => item.code === code)
        if (!event) {
            throw new NotFoundException("EVENT_NOT_EXISTS - No matches event Code")
        }
        const now = ZonedDateTime.now(ZoneId.UTC).toEpochSecond()
        // 노출 날짜 체크
        if (!(event.exposureStart <= now && event.exposureEnd >= now)) {
            throw new NotFoundException("EVENT_NOT_EXISTS - Exposure date error")
        }

        // 노출이 안되는 기획전이 있으므로 type이 main이 아닌 event만 visible 체크
        if (event.type !== "MAIN") {
            if (!event.visible) {
                throw new NotFoundException("EVENT_NOT_EXISTS - Visibility status error")
            }

            if (event.type === "BANNER") {
                return {
                    code: event.code,
                    imageUrl: null,
                    clickLink: event.clickLink,
                    trackLink: event.trackLink,
                    type: event.type,
                    expoSd: event.exposureStart,
                    expoEd: event.exposureEnd,
                    sortOrder: event.sortOrder,
                    attr: event.attr,
                } as PluralHomeBannerDto
            }
        }

        return null
    }

    async getEventData() {
        if (arrayNotEmpty(this.data)) {
            return this.data
        }

        try {
            const axiosRes = await axios.get<JsonEvent[]>(
                `${this.cdnUrl}/events/data-v1_1.json`,
            )
            if (axiosRes.status === 200) {
                this.logger.log(axiosRes.data)
                this.data = axiosRes.data
                return axiosRes.data
            } else {
                return []
            }
        } catch (e) {
            this.logger.error(`Getting event has error - ${e}`)
            return []
        }
    }

    async getEvents(type: string) {
        const events = await this.prisma.event.findMany({
            where: {
                type: type,
            },
            select: {

            }
        })
    }
}
