import * as process from "node:process"

import {Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"

import {mongodbConfig} from "@libs/core/config"
import {emptyIsNull} from "@libs/utils"

export const dynamicMongoose = async () => {
    await ConfigModule.envVariablesLoaded
    const {MONGO_HOST, MONGO_PORT} = process.env
    if (!emptyIsNull(MONGO_HOST) || !emptyIsNull(MONGO_PORT)) {
        return []
    }
    return [MongoDBModule]
}

@Module({
    imports: [
        ConfigModule.forFeature(mongodbConfig),
        /* MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                const config = configService.get<MongoConfig>("mongodb")

                const credential: string[] = []
                if (config.username) {
                    credential.push(config.username)
                }
                if (config.password) {
                    credential.push(":")
                    credential.push(config.password)
                }
                if (credential.length > 0) {
                    credential.push("@")
                }
                const uri = `mongodb://${credential.join("")}${config.host}:${config.port}`
                return {
                    uri,
                    retryAttempts: 2,
                    retryDelay: 1000,
                }
            },
            inject: [ConfigService],
        }),*/
    ],
})
export class MongoDBModule {}
