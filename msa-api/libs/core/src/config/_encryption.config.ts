import * as process from "node:process"

import {registerAs} from "@nestjs/config"

import {EncryptionConfig} from "@libs/core/config"

export default registerAs(
    "encryptionConfig",
    () =>
        ({
            key: process.env.ENCRYPTION_KEY,
            iv: process.env.ENCRYPTION_IV,
            method: process.env.ENCRYPTION_METHOD || "aes-256-cbc",
        }) as EncryptionConfig,
)
