import {applyDecorators} from "@nestjs/common"
import {ApiResponse, getSchemaPath} from "@nestjs/swagger"
import {ResponseDto} from "../response.utils";


export type ApiCustomResponseOptions = {
    status: number
    type: string
    description?: string
    error?: string
}

export const ApiErrorResponse = (option: ApiCustomResponseOptions) => {
    const {error, type, ...other} = option
    return applyDecorators(
        ApiResponse(
            {
                ...other,
                schema: {
                    allOf: [
                        {$ref: getSchemaPath(ResponseDto<string>)},
                        {
                            example: {
                                apiCode: option.status + "",
                                message: "failed",
                                data: null,
                                metadata: {
                                    request: {
                                    },
                                    exception: {
                                        name: type,
                                        error: error,
                                        cause: "Verbose message",
                                        stack: "Stack trace",
                                    },
                                },
                            },
                            properties: {
                                data: {
                                    type: "null",
                                },
                            },
                        },
                    ],
                },
            },
            {overrideExisting: true},
        ),
    )
}
