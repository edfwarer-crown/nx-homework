import {ApiProperty} from "@nestjs/swagger"

export class TranslatedMetaDto {
    @ApiProperty({
        description: "메타 키",
    })
    key: string

    @ApiProperty({
        description: "메타 실제 값",
    })
    value: string

    @ApiProperty({
        description: "번역문",
    })
    translatedValue: string
}
