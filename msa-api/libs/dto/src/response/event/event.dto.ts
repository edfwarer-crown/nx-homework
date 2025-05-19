import {ApiProperty, OmitType} from "@nestjs/swagger"

import {PluralEventDto} from "@libs/dto/response/event/plural-event.dto"

export class EventDto extends OmitType(PluralEventDto, ["sortOrder"] as const) {
    @ApiProperty({
        description: "메인 비주얼 파일",
    })
    attachment: null
}
