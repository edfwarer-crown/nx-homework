import * as crypto from "crypto"

import {Logger} from "@nestjs/common"

const sha256 = (value: string): string => {
    return crypto.createHash("sha256").update(value).digest("hex")
}

const compareSha256 = (plainText: string, encoded: string): boolean => {
    return crypto.createHash("sha256").update(plainText).digest("hex") === encoded
}

const generateRandomToken = (id: number): string => {
    const now = new Date().getTime() / 1000 // Current time in seconds (UTC)
    const random = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) // Generate a random long value
    const token = Math.abs(now ^ id ^ random).toString()

    return token.length > 20 ? token.substring(0, 20) : token
}

const aes = (key: string, value: string): string => {
    Logger.debug(key)

    const cipher = crypto.createCipheriv("aes-128-ecb", key, null)

    return Buffer.concat([cipher.update(value), cipher.final()]).toString("hex")
}

export const CryptoUtils = {
    sha256,
    compareSha256,
    aes,
    generateRandomToken,
}
