import {applyDecorators, HttpStatus} from "@nestjs/common"
import {ApiExtraModels, ApiOperation, ApiResponse, getSchemaPath} from "@nestjs/swagger"
import {ApiAuth} from "./api-auth.decorator";
import {Public} from "./public.decorator";
import {PagedResponseDto, ResponseDto, ResponseWrapper} from "../response.utils";
import {PaginatedDto} from "../../../dto/src/page.dto";


export type OperationOptions = {
    auth?: boolean
    public?: boolean
    deprecated?: boolean
    response?: any
    isPaging?: boolean
    isArray?: boolean
    example?: any
    summary?: string
    description?: string
    status?: HttpStatus
}

/**
 * IF 설명과 응답을 한번에 설정하는 데코레이터
 * @param options
 * @constructor
 */
export const Operation = <T = any>(options: OperationOptions = {}) => {
    const {auth = true, public: isPublic = false, response = class {}, isPaging = false, isArray = false, summary, description, example, deprecated = false, status = 200} = options

    const authDecorators = []

    if (auth) {
        authDecorators.push(
            ApiAuth({
                basic: "basic",
                bearer: "token",
            }),
        )
    }

    if (isPublic) {
        authDecorators.push(Public())
    }

    const isPrimitive = [
        "Boolean",
        "Number",
        "String",
    ].indexOf(response.name) > -1
    //
    const itemType = isPrimitive ? {type: response.name.toLowerCase()} : {$ref: getSchemaPath(response)}
    // const itemType = {$ref: getSchemaPath(response)}

    return applyDecorators(
        isPrimitive ? ApiExtraModels(ResponseDto<T>, PagedResponseDto<T>) : ApiExtraModels(ResponseDto<T>, PagedResponseDto<T>, response),
        ApiOperation({summary, description, deprecated}),
        ApiResponse({
            status,
            schema: {
                allOf: [
                    {$ref: isPaging ? getSchemaPath(PagedResponseDto<T>) : getSchemaPath(ResponseDto<T>)},
                    {
                        ...(example ? {example: ResponseWrapper(example, isPaging ? new PaginatedDto() : null)} : {}),
                        properties: {
                            data: {
                                ...(((isPaging || isArray) && {
                                    type: "array",
                                    items: {...itemType},
                                }) || {...itemType}),
                            },
                        },
                    },
                ],
            },
        }),
        ...authDecorators,
    )
}
