import {ApiProperty} from "@nestjs/swagger"
import {ApiPropertyOptions} from "@nestjs/swagger/dist/decorators/api-property.decorator"

export const ApiEnumProperty = (options?: ApiPropertyOptions) => {
    const enums = options?.enum

    return ApiProperty({
        example: Object.keys(enums).filter((k) => typeof enums[k as any] === "number"),
        ...options,
    })
}
