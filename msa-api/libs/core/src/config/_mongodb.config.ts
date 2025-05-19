import * as process from "node:process"

import {registerAs} from "@nestjs/config"

import {MongoConfig} from "@libs/core/config"

export default registerAs("mongodb", () => {
    return {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
    } as MongoConfig
})
