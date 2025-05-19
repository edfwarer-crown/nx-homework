import * as process from "node:process"

import {Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"
import {emptyIsNull} from "../../../utils/src";


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
    ],
})
export class MongoDBModule {}
