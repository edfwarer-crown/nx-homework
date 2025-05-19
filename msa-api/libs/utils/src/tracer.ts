import {IncomingMessage, ServerResponse} from "http"

import tracer, {Span} from "dd-trace"
import {isNotLocal} from "./node-env";


// Local이 아닐 경우만 실행
if (isNotLocal()) {
    tracer.init({
        logInjection: true,
        startupLogs: true,
        profiling: true,
        runtimeMetrics: true,
    })
    tracer.use("fastify", {
        hooks: {
            request: (span: Span, req: IncomingMessage, res: ServerResponse) => {
                const route = req.url.split("?")?.[0] ?? req.url
                span?.setTag("http.route", `${route}`)
                span?.setTag("resource.name", `${req.method} ${route}`)
            },
        },
    })
    tracer.use("pino", {
        enabled: true,
    })
    tracer.use("http", {
        hooks: {
            request: (span: Span, req: IncomingMessage, res: ServerResponse) => {
                const route = req.url.split("?")?.[0] ?? req.url
                span?.setTag("http.route", route)
                span?.setTag("resource.name", `${req.method} ${route}`)
            },
        },
        server: {
            blocklist: ["/health"],
        },
    })
}

export default tracer
