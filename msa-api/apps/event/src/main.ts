import {ConfigService} from "@nestjs/config"

import {CustomNestFactory} from "@libs/core/createApp"
import {EventAppModule} from "./event-app.module";

async function bootstrap() {
    const app = await CustomNestFactory.create(EventAppModule, true)
    const configService = app.get(ConfigService)
    const serverPort = configService.get<number>("SERVER_PORT", 3002)
    await app.listen(serverPort, "0.0.0.0")
}

bootstrap()
