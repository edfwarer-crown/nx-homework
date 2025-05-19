import * as crypto from "crypto"

import {Injectable} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"
import {EncryptionConfig} from "./config/config.type";


@Injectable()
export class EncryptionUtils {
    private readonly secretKey: string
    private readonly secretIv: string
    private readonly encryptionMethod: string

    constructor(configService: ConfigService) {
        const secrets = configService.get<EncryptionConfig>("encryptionConfig")

        this.encryptionMethod = secrets.method
        this.secretKey = crypto.createHash("sha512").update(secrets.key).digest("hex").substring(0, 32)
        this.secretIv = crypto.createHash("sha512").update(secrets.iv).digest("hex").substring(0, 16)
    }

    encrypt(data: string) {
        const cipher = crypto.createCipheriv(this.encryptionMethod, this.secretKey, this.secretIv)
        return Buffer.from(cipher.update(data, "utf8", "hex") + cipher.final("hex")).toString("base64")
    }

    decrypt(encryptedData: string) {
        const buff = Buffer.from(encryptedData, "base64")
        const decipher = crypto.createDecipheriv(this.encryptionMethod, this.secretKey, this.secretIv)
        return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8")
    }
}
