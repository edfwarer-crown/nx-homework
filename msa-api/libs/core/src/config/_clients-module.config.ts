import * as process from "node:process"

import {registerAs} from "@nestjs/config"
import {Transport} from "@nestjs/microservices"

export default registerAs("clientsModuleConfig", () => ({
    transport: Transport.REDIS,
    options: {
        host: process.env.MICROSERVICE_REDIS_HOST,
        port: process.env.MICROSERVICE_REDIS_PORT,
        password: process.env.MICROSERVICE_REDIS_PASS,
        retryAttempts: 10,
        retryDelay: 100,
    },
}))
