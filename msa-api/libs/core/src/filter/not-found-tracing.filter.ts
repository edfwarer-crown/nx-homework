import {ArgumentsHost, Catch, ExceptionFilter, NotFoundException} from "@nestjs/common"
import {FastifyReply, FastifyRequest} from "fastify"

@Catch(NotFoundException)
export class NotFoundTracingFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<FastifyRequest>()
        const response = ctx.getResponse<FastifyReply>()

        response.status(404).send({
            apiCode: "404",
            message: "Not found",
            timestamp: Math.floor(+Date.now() / 1000),
            data: null,
        })
    }
}
