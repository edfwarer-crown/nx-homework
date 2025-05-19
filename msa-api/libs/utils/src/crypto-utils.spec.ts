import * as crypto from "crypto"
import {CryptoUtils} from "./crypto.utils";


describe("Crypto Utils Test", () => {
    const mid = "nictest04m"

    it("AES", () => {
        const secret = "b+zhZ4yOZ7FsH8pm10safdaspidfWERsad10fijw86yLc6BJeFVrZFXhAoJ3gEWgr+wN123MV0W4hvDdbe4Sjw=="
        const plain = "CardNo=1234567890123456&ExpYear=25&ExpMonth=12&IDNo=800101&CardPw=12"

        const encryptKey = secret.slice(0, 16)

        expect(encryptKey).toEqual("b+zhZ4yOZ7FsH8pm")

        expect(CryptoUtils.aes(encryptKey, plain)).toEqual("7b23e8b9e9e144228d4c288fbedb570ec6e6466c9b59a0e1670204550cc1954a9e638e3b4daa5cef1f4f238539e28181782196f43b3b72b9dad3956bbd7117b41204cd479bcd2afc55e790b5bc121855")
    })

    it("Sha256", () => {
        const secret = "b+zhZ4yOZ7FsH8pm5lhDfHZEb79tIwnjsdA0FBXh86yLc6BJeFVrZFXhAoJ3gEWgrWwN+lJMV0W4hvDdbe4Sjw=="
        const ediDate = "20191219133357"
        const moid = "1004"

        const plain = `${mid}${ediDate}${moid}${secret}`

        expect(plain).toEqual("nictest04m201912191333571004b+zhZ4yOZ7FsH8pm5lhDfHZEb79tIwnjsdA0FBXh86yLc6BJeFVrZFXhAoJ3gEWgrWwN+lJMV0W4hvDdbe4Sjw==")

        expect(CryptoUtils.sha256(plain)).toEqual("4a3c5e954fb185836bf181046416021236fc2b8cf3aae03de0c60b65073e9004")
    })

    it("Gen", () => {
        const key = crypto.randomBytes(32) // 32바이트 키 생성
        const iv = crypto.randomBytes(16) // 16바이트 IV 생성

        console.log("Key:", key.toString("hex"))
        console.log("IV:", iv.toString("hex"))
    })
})
