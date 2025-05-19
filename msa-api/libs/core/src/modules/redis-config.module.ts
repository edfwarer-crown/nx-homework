import {RedisModule} from "@liaoliaots/nestjs-redis"
import {Module} from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"
import type {RedisOptions} from "ioredis"

import {redisConfig} from "@libs/core/config"

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule.forFeature(redisConfig)],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    readyLog: true,
                    config: [
                        {
                            ...configService.get<RedisOptions>("redisConfig"),
                        },
                        {
                            namespace: "subscribeConnection",
                            ...configService.get<RedisOptions>("redisConfig"),
                        },
                        {
                            namespace: "publishConnection",
                            ...configService.get<RedisOptions>("redisConfig"),
                        },
                    ],
                }
            },
        }),
    ],
})
export class RedisConfigModule {}
