import {Module} from "@nestjs/common"
import {ConfigService} from "@nestjs/config"

import {CustomNestFactory} from "@libs/core/createApp"
import {isNotProduction} from "@libs/utils/node-env"

import {NexonModule} from "./nexon.module"
import {swaggerCreate} from "./swagger.creator"

@Module({})
export class NothingModule {}

async function bootstrap() {
    const app = await CustomNestFactory.create(NexonModule, true)

    if (isNotProduction()) {
        swaggerCreate(app)
    }

    const configService = app.get(ConfigService)
    const serverPort = configService.get<number>("SERVER_PORT", 3000)
    await app.listen(serverPort, "0.0.0.0")
}

bootstrap()
