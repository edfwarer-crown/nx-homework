/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Injectable, Logger, NestMiddleware} from "@nestjs/common"
import {FastifyReply, FastifyRequest} from "fastify"
import {v4} from "uuid"

type NextFunction = (error?: Error | any) => void

@Injectable()
export class LoggerMiddleware implements NestMiddleware<FastifyRequest["raw"], FastifyReply["raw"]> {
    private readonly logger: Logger = new Logger(LoggerMiddleware.name)

    use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: NextFunction): any {
        // @ts-ignore
        const {method, originalUrl: url} = req
        const userAgent = req.headers["user-agent"]

        if (url.indexOf("health") > 0 || url.indexOf("docs") > 0) {
            next()
            return
        }

        const existing = req.headers["X-Request-ID"]

        if (!existing) {
            req.headers["X-Request-ID"] = v4()
        }

        this.logger.log(`🛬 [API - REQ] ${req.headers["X-Request-ID"]} : [${method.toUpperCase()}] ${url} - ${userAgent}`)

        res.on("finish", () => {
            const {statusCode} = res
            this.logger.log(`🛫 [API - RES] ${res.req.headers["X-Request-ID"]} : [${method.toUpperCase()}] ${url} - ${statusCode}`)
        })
        next()
    }
}
