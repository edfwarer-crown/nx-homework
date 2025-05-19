import {registerAs} from "@nestjs/config"
import type {RedisOptions} from "ioredis"

export default registerAs(
    "redisConfig",
    () =>
        ({
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            password: process.env.REDIS_PASS,
        }) as RedisOptions,
)
