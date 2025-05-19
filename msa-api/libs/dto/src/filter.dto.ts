import {ApiExtraModels, ApiProperty, getSchemaPath} from "@nestjs/swagger"

export class SimpleFilterValueDto {
    @ApiProperty({
        description: "표시 이름",
    })
    title: string

    @ApiProperty({
        description: "실제값",
    })
    value: string
}

export class ColorFilterValueDto {
    @ApiProperty({
        description: "표시 이름",
    })
    title: string

    @ApiProperty({
        description: "코드",
    })
    value: string

    @ApiProperty({
        description: "16진수 색상. #포함",
    })
    color: string
}

export class RangeFilterValueDto {
    @ApiProperty({
        description: "단위",
    })
    unit: string

    @ApiProperty({
        description: "최소값",
    })
    minValue: number | null

    @ApiProperty({
        description: "최대값",
    })
    maxValue: number | null
}

@ApiExtraModels(SimpleFilterValueDto, ColorFilterValueDto, RangeFilterValueDto)
export class FilterDto {
    @ApiProperty({
        description: "필터의 유형",
        enum: [
            "SINGLE-SELECT",
            "MULTI-SELECT",
            "RANGE",
            "COLOR",
        ],
    })
    type: "SINGLE-SELECT" | "MULTI-SELECT" | "RANGE" | "COLOR"

    @ApiProperty({
        description: "필터 종류. 필터가 적용되는 곳",
    })
    code: string

    @ApiProperty({
        description: "필터이름",
    })
    name: string

    @ApiProperty({
        oneOf: [
            {
                type: "array",
                items: {
                    oneOf: [
                        {
                            $ref: getSchemaPath(SimpleFilterValueDto),
                        },
                        {
                            $ref: getSchemaPath(ColorFilterValueDto),
                        },
                    ],
                },
            },
            {
                $ref: getSchemaPath(SimpleFilterValueDto),
            },
            {
                $ref: getSchemaPath(RangeFilterValueDto),
            },
        ],
        description:
      "필터 범위 필터를 제외하고는 일반적으로는 배열 형태로 제공합니다.",
        examples: {
            "단순 필터": {
                summary: "일반 필터",
                value: {
                    title: "",
                    value: "",
                },
            },
            "색상 필터": {
                summary: "색상 필터",
                value: {
                    title: "",
                    color: "",
                },
            },
            "범위 필터": {
                summary: "색상 필터",
                value: {
                    unit: "",
                    minValue: "",
                    maxValue: "",
                },
            },
        },
    })
    values:
        | SimpleFilterValueDto[]
        | ColorFilterValueDto[]
        | RangeFilterValueDto
        | SimpleFilterValueDto
}
