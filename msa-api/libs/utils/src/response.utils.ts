import {HttpException} from "@nestjs/common"
import {ApiProperty} from "@nestjs/swagger"
import {Transform, Type} from "class-transformer"
import {PaginatedDto} from "../../dto/src/page.dto";


export class ResponseMetadata {
    @ApiProperty({example: "렌더할 메시지입니다.", type: "string", required: false}) // 추가된 프로퍼티
    renderMessage?: string; // 브라우저에서 렌더할 메시지 프로퍼티

    [key: string]: any
}

export class ResponseDto<T> {
    @ApiProperty({
        example: "1",
        description: "API 응답코드",
    })
    apiCode: string

    @ApiProperty({example: "success"})
    message?: string

    @Type(() => Date)
    @Transform(
        ({value, key, obj, type}) => {
            console.log("Passed as \"value\"", value) // Logs plain object
            console.log("Passed inside \"obj\"", obj) // Logs class
            return value.getTime()
        },
        {toPlainOnly: true},
    )
    @ApiProperty({
        description: "응답 기준 시간",
        type: "number",
        format: "int32",
    })
    timestamp: number

    @ApiProperty({
        description: "실제 데이터 Prop",
    }) // 추가된 프로퍼티
    data?: T

    @ApiProperty({type: ResponseMetadata, required: false}) // 추가된 프로퍼티
    metadata?: ResponseMetadata
}

export class PagedResponseDto<T> {
    @ApiProperty({
        example: "1",
        description: "API 응답코드",
    })
    apiCode: string

    @ApiProperty({example: "success"})
    message?: string

    @ApiProperty({
        description: "응답 기준 시간",
        type: "number",
        format: "int32",
    })
    @Type(() => Date)
    @Transform(
        ({value, key, obj, type}) => {
            console.log("Passed as \"value\"", value) // Logs plain object
            console.log("Passed inside \"obj\"", obj) // Logs class
            return value.getTime()
        },
        {toPlainOnly: true},
    )
    timestamp: number

    @ApiProperty({
        description: "실제 데이터 Prop",
    }) // 추가된 프로퍼티
    data?: T

    @ApiProperty({
        description: "페이지 정보",
        required: false,
        readOnly: true,
    })
    paging: PaginatedDto

    @ApiProperty({type: ResponseMetadata, required: false}) // 추가된 프로퍼티
    metadata?: ResponseMetadata
}

export const ResponseWrapper = <T>(data: T, paging: PaginatedDto = null, metadata: ResponseMetadata = null): ResponseDto<T> | PagedResponseDto<T> => {
    const response = {
        apiCode: "1",
        message: "success",
        // timestamp: ZonedDateTime.now(),
        timestamp: Math.floor(+Date.now() / 1000),
        data,
        metadata,
    } as ResponseDto<T>

    if (!paging) {
        return response
    }

    const {metadata: mdata, ...others} = response

    return {
        ...others,
        paging,
        metadata: mdata,
    } as PagedResponseDto<T>
}

export const fromHttpException = <T>(exception: HttpException, metadata: ResponseMetadata = null): ResponseDto<T> => {
    if (!metadata) {
        metadata = new ResponseMetadata()
    }

    metadata["exception"] = {
        name: exception.name,
        error: exception.message,
        cause: exception.cause,
        stack: exception.stack,
    }

    return {
        apiCode: exception.getStatus() + "",
        message: "failed",
        timestamp: Math.floor(+Date.now() / 1000),
        data: null,
        metadata,
    } as ResponseDto<T>
}
export const customException = <T>(data: T, apiCode = 500 + "", metadata: ResponseMetadata = null): ResponseDto<T> => {
    return {
        apiCode,
        message: "failed",
        timestamp: Math.floor(+Date.now() / 1000),
        data,
        metadata,
    } as ResponseDto<T>
}

export const toPage = (page: number = 0, size: number = 20, total: number = 1): PaginatedDto => {
    const lastPage = Math.ceil(total / size)

    return {
        isFirst: page == 0,
        isLast: page == lastPage - 1,
        page,
        size,
        totalElements: total,
        totalPage: lastPage,
    }
}
