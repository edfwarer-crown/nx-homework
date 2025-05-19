import {ConfigService} from "@nestjs/config"

import {AuthAppModule} from "@apps/auth/auth-app.module"
import {CustomNestFactory} from "@libs/core/createApp"

async function bootstrap() {
    const app = await CustomNestFactory.create(AuthAppModule, true)

    const configService = app.get(ConfigService)
    const serverPort = configService.get<number>("SERVER_PORT", 3001)
    await app.listen(serverPort, "0.0.0.0")
}

bootstrap()
