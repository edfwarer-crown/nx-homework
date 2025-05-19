import {ConfigService} from "@nestjs/config"

import {UserAppModule} from "@apps/user/user-app.module"
import {CustomNestFactory} from "@libs/core/createApp"

async function bootstrap() {
    const app = await CustomNestFactory.create(UserAppModule, true)

    const configService = app.get(ConfigService)

    const serverPort = configService.get<number>("SERVER_PORT", 3005)
    await app.listen(serverPort, "0.0.0.0")
}

bootstrap()
