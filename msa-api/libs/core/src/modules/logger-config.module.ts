import {Global, Logger, Module, RequestMethod, Scope} from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"
import {INQUIRER} from "@nestjs/core"
import {DatadogTraceModule} from "nestjs-ddtrace"
import {LoggerModule} from "nestjs-pino"
import {Params} from "nestjs-pino/params"
import pino from "pino"
import {v4} from "uuid"
import {isNotLocal} from "../../../utils/src/node-env";


const loggerAlias = {
    scope: Scope.TRANSIENT,
    provide: Logger,
    inject: [INQUIRER],
    useFactory: (instance) => new Logger(instance.constructor.name),
}

@Module({
    imports: [
    ],
    providers: [loggerAlias],
    exports: [Logger],
})
export class LocalLoggerConfigModule {}

@Global()
@Module({
    imports: [
        DatadogTraceModule.forRoot({
            controllers: true,
            providers: true,
            excludeProviders: [
                "TraceService",
                "ModuleRef",
                "Reflector",
                "DecoratorInjector",
                "LoggingMiddleware",
                "InstanceLoader",
                "RouterExplorer",
            ],
        }),
        LoggerModule.forRootAsync({
            useFactory: () => {
                return {
                    pinoHttp: {
                        genReqId: function (req, res) {
                            // req - id 를 uuid로 생성
                            const existingId = req.id ?? req.headers["X-Request-ID"]
                            if (existingId) return existingId
                            const uuid = v4()
                            res.setHeader("X-Request-ID", uuid)
                            return uuid
                        },
                        transport: {target: "pino-pretty"},
                        level: isNotLocal() ? "debug" : "info",
                        customProps: function (req, res) {
                            const token = req.headers.authorization

                            const customProp = {
                                auth: null,
                            }
                            if (token) {
                                if (token.indexOf("Bearer ") > -1) {
                                    try {
                                        customProp.auth = {
                                            authType: "JWT",
                                        }
                                    } catch (e) {
                                        customProp.auth = {
                                            authType: "ANONYMOUS",
                                        }
                                    }
                                } else {
                                    customProp.auth = {
                                        authType: "BASIC",
                                    }
                                }
                            } else {
                                customProp.auth = {
                                    authType: "ANONYMOUS",
                                }
                            }

                            return customProp
                        },
                        autoLogging: false,
                        redact: {
                            // 로그 표기시 제외 처리
                            remove: true,
                            paths: [
                                "email",
                                "password",
                                "req.query",
                                "req.params",
                                "req.query",
                                "res.headers",
                                "req.headers.host",
                                "req.headers.connection",
                                "req.headers.accept",
                                "req.headers.origin",
                                "req.headers.referer",
                                "req.headers[\"content-type\"]",
                                "req.headers[\"sec-ch-ua\"]",
                                "req.headers[\"sec-ch-ua-mobile\"]",
                                "req.headers[\"user-agent\"]",
                                "req.headers[\"sec-ch-ua-platform\"]",
                                "req.headers[\"sec-fetch-site\"]",
                                "req.headers[\"sec-fetch-mode\"]",
                                "req.headers[\"sec-fetch-dest\"]",
                                "req.headers[\"accept-encoding\"]",
                                "req.headers[\"accept-language\"]",
                                "req.headers[\"if-none-match\"]",
                            ],
                        },
                        timestamp: pino.stdTimeFunctions.isoTime,
                    },
                    exclude: [
                        {method: RequestMethod.ALL, path: "health"},
                        {method: RequestMethod.ALL, path: "docs"},
                    ],
                } as Params
            },
        }),
        LocalLoggerConfigModule,
    ],
})
export class LoggerConfigModule {}
