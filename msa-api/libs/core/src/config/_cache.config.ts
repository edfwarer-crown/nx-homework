import {registerAs} from "@nestjs/config"
import {CacheConfig} from "./config.type";


export default registerAs(
    "cacheConfig",
    () => {
        return ({
            host: process.env.CACHE_STORE_HOST || process.env.REDIS_HOST,
            port: (process.env.CACHE_STORE_PORT && +process.env.CACHE_STORE_PORT) || (process.env.REDIS_PORT && +process.env.REDIS_PORT),
            user: process.env.CACHE_STORE_USER || process.env.REDIS_USER,
            password: process.env.CACHE_STORE_PASS || process.env.REDIS_PASS,
            ttl: (process.env.CACHE_STORE_TTL && +process.env.CACHE_STORE_TTL) || 60_000,
        }) as CacheConfig
    },
)
