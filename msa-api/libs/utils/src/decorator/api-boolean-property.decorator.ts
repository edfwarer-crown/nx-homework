import {applyDecorators} from "@nestjs/common"
import {ApiProperty} from "@nestjs/swagger"
import {ApiPropertyOptions} from "@nestjs/swagger/dist/decorators/api-property.decorator"
import {Transform} from "class-transformer"
import {IsBoolean, IsDefined} from "class-validator"

export const ApiBooleanPropertyDecorator = (options?: ApiPropertyOptions) =>
    applyDecorators(
        IsDefined,
        Transform(({value}) => {
            if (value === "true") return true
            if (value === "false") return false
            return value
        }),
        IsBoolean,
        ApiProperty(options),
    )
