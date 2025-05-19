import * as process from "node:process"

import {registerAs} from "@nestjs/config"

import {JwtConfig} from "@libs/core/config"

export default registerAs(
    "jwt",
    () =>
        ({
            secret: process.env.JWT_SECRET,
            admin: process.env.JWT_ADMIN_TOKEN,
        }) as JwtConfig,
)
