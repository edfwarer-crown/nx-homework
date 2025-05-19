import {registerAs} from "@nestjs/config"
import {AppConfig} from "./config.type";


export default registerAs(
    "app",
    () =>
        ({
            frontUrl: process.env.FRONT_HOST || "",
            deepLinkUrlPrefix: process.env.DEEPLINK_URL_PREFIX,
            jsonRepositoryUrl: process.env.JSON_URL || null,
        }) as AppConfig,
)
