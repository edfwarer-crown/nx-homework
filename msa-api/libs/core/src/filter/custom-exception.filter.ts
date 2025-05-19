import * as process from "node:process"

import {ArgumentsHost, Catch, HttpException, Injectable, Logger, Scope} from "@nestjs/common"
import {BaseExceptionFilter} from "@nestjs/core"
import {IncomingWebhook} from "@slack/webhook"
import {FastifyReply, FastifyRequest} from "fastify"

import {customException, emptyIsNull, fromHttpException, ResponseMetadata} from "@libs/utils"
import {isNotLocal} from "@libs/utils/node-env"

@Injectable({scope: Scope.REQUEST})
@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new Logger(CustomExceptionFilter.name)

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<FastifyRequest>()
        const response = ctx.getResponse<FastifyReply>()

        const statusCode = exception instanceof HttpException ? (exception as unknown as HttpException).getStatus() : (exception["getStatus"] === "function" ? exception.getStatus() : 500)

        if (isNotLocal()) {
            if (emptyIsNull(process.env.SLACK_ERROR_WEBHOOK_URL)) {
                const stack = exception.stack?.split("\n")
                const webhook = new IncomingWebhook(process.env.SLACK_ERROR_WEBHOOK_URL)
                await webhook.send({
                    text: `Error occurred in API: ${request.url}\nStatus: ${statusCode}\nMessage: ${(exception as any).message}\nStack:${stack.slice(1, 4).join("\n")}`,
                })
            }
        }

        if (exception.stack) {
            this.logger.error(exception.stack)
        } else {
            this.logger.error(exception)
        }

        const metadata = new ResponseMetadata()
        if (request.headers["X-Request-ID"]) {
            metadata["request"] = {
                requestId: request.headers["X-Request-ID"],
            }
        }

        if (exception instanceof HttpException) {
            response.code(statusCode).send(fromHttpException(exception, metadata))
        } else {
            response.code(statusCode).send(customException(exception.message, statusCode + "", metadata))
        }
    }
}
