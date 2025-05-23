/* eslint-disable @typescript-eslint/no-require-imports */
import {CallHandler, ClassSerializerContextOptions, ExecutionContext, Inject, Injectable, NestInterceptor, Optional, StreamableFile} from "@nestjs/common"
import {ClassTransformOptions} from "@nestjs/common/interfaces/external/class-transform-options.interface"
import {TransformerPackage} from "@nestjs/common/interfaces/external/transformer-package.interface"
import {CLASS_SERIALIZER_OPTIONS} from "@nestjs/common/serializer/class-serializer.constants"
import {loadPackage} from "@nestjs/common/utils/load-package.util"
import {isObject} from "@nestjs/common/utils/shared.utils"
import {Observable} from "rxjs"
import {map} from "rxjs/operators"

let classTransformer: TransformerPackage = {} as any

export interface PlainLiteralObject {
    [key: string]: any
}

// NOTE (external)
// We need to deduplicate them here due to the circular dependency
// between core and common packages
const REFLECTOR = "Reflector"

/**
 * @publicApi
 */
export interface ClassSerializerInterceptorOptions extends ClassTransformOptions {
    transformerPackage?: TransformerPackage
}

/**
 * @publicApi
 */
@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
    constructor(
        @Inject(REFLECTOR) protected readonly reflector: any,
        @Optional()
        protected readonly defaultOptions: ClassSerializerInterceptorOptions = {},
    ) {
        classTransformer = defaultOptions?.transformerPackage ?? loadPackage("class-transformer", "ClassSerializerInterceptor", () => require("class-transformer"))

        if (!defaultOptions?.transformerPackage) {
            require("class-transformer")
        }
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const contextOptions = this.getContextOptions(context)
        const options = {
            ...this.defaultOptions,
            ...contextOptions,
        }
        return next.handle().pipe(map((res: PlainLiteralObject | Array<PlainLiteralObject>) => this.serialize(res, options)))
    }

    /**
     * Serializes responses that are non-null objects nor streamable files.
     */
    serialize(response: PlainLiteralObject | Array<PlainLiteralObject>, options: ClassSerializerContextOptions): PlainLiteralObject | Array<PlainLiteralObject> {
        if (!isObject(response) || response instanceof StreamableFile) {
            return response
        }

        return Array.isArray(response) ? response.map((item) => this.transformToPlain(item, options)) : this.transformToPlain(response, options)
    }

    transformToPlain(plainOrClass: any, options: ClassSerializerContextOptions): PlainLiteralObject {
        if (!plainOrClass) {
            return plainOrClass
        }
        if (!options.type) {
            return classTransformer.classToPlain(plainOrClass, options)
        }
        if (plainOrClass instanceof options.type) {
            return classTransformer.classToPlain(plainOrClass, options)
        }
        const instance = classTransformer.plainToClass(options.type, plainOrClass)
        return classTransformer.classToPlain(instance, options)
    }

    protected getContextOptions(context: ExecutionContext): ClassSerializerContextOptions | undefined {
        return this.reflector.getAllAndOverride(CLASS_SERIALIZER_OPTIONS, [context.getHandler(), context.getClass()])
    }
}
