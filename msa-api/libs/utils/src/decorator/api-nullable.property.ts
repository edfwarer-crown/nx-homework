import {applyDecorators} from "@nestjs/common"
import {ApiProperty} from "@nestjs/swagger"
import {ApiPropertyOptions} from "@nestjs/swagger/dist/decorators/api-property.decorator"

export const ApiNullableProperty = (options?: ApiPropertyOptions) => {
    options.required = false
    return applyDecorators(
        ApiProperty(options),
    )
}
