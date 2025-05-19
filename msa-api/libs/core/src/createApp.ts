import fastifyFormbody from "@fastify/formbody"
import {Logger, LoggerService, ValidationPipe, VersioningType} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {NestFactory} from "@nestjs/core"
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify"
import {FastifyRequest} from "fastify"
import {ContentTypeParserDoneFunction} from "fastify/types/content-type-parser"
import {Logger as PinoLogger} from "nestjs-pino"
import {parse} from "qs"

import "@libs/utils/tracer"
import {NotFoundTracingFilter} from "./filter/not-found-tracing.filter";
import {isNotLocal} from "../../utils/src/node-env";

BigInt.prototype["toJSON"] = function () {
    return Number.parseInt(this.toString())
}

// TODO:  https://docs.nestjs.com/openapi/other-features
const createApp = async (module: any, requireMicroservices: boolean = false) => {
    const adapter = new FastifyAdapter({
        querystringParser: (str) => parse(str),
    })
    adapter.register(fastifyFormbody)

    const contentParser = (_request: FastifyRequest, _payload: string | Buffer, done: ContentTypeParserDoneFunction) => {
        try {
            if (_payload === null || _payload === "") {
                done(null, null)
                return
            }
            if (_payload instanceof Buffer) {
                _payload = _payload.toString()
            }

            const json = JSON.parse(_payload as string)
            done(null, json)
        } catch (error) {
            error.statusCode = 400
            done(error, undefined)
        }
    }
    adapter.getInstance().addContentTypeParser("application/json; charset=utf-8", {parseAs: "string", bodyLimit: 0}, contentParser)
    adapter.getInstance().addContentTypeParser("application/json", {parseAs: "string", bodyLimit: 0}, contentParser)

    const app = await NestFactory.create<NestFastifyApplication>(module, adapter, {
        // bufferLogs: true,
        rawBody: true,
    })

    const logger: LoggerService = await (() => {
        if (isNotLocal()) {
            return app.resolve(PinoLogger)
        } else {
            return new Logger()
        }
    })()

    app.useLogger(logger)

    app.useGlobalFilters(new NotFoundTracingFilter())
    app.useGlobalPipes(
        // new ValidationPipe({
        //     transformOptions: {enableImplicitConversion: true},
        //     transform: true,
        // }),
        new ValidationPipe({
            transformOptions: {
                enableImplicitConversion: true,
            },
            transform: true,
            // forbidUnknownValues: true,
            always: true,
            validationError: {
                target: true,
                value: true,
            },
        }),
    )
    app.useBodyParser("json", {bodyLimit: 10_485_760})
    app.enableVersioning({
        defaultVersion: "1.0",
        type: VersioningType.URI,
    })

    app.enableCors({
        origin: "*",
        allowedHeaders: "*",
    })

    // if (isLocal()) {
    //     swaggerCreator(app, module.name)
    // }

    const configService = app.get(ConfigService)

    if (requireMicroservices) {
        app.connectMicroservice(configService.get("clientsModuleConfig"))
        await app.startAllMicroservices()
    }

    process.on("unhandledRejection", (error: any) => {
        logger.error(error)
    })
    process.on("uncaughtException", (error: any) => {
        logger.error(error)
    })

    app.enableShutdownHooks()

    return app
}

export const CustomNestFactory = {
    create: createApp,
}
