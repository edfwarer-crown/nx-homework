import {HttpModule, HttpService} from "@nestjs/axios"
import {DynamicModule, Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"

import {slackConfig} from "@libs/core/config"

@Module({})
export class SlackModule {
    static register(): DynamicModule {
        return {
            module: SlackModule,
            imports: [
                ConfigModule.forFeature(slackConfig),
                HttpModule.register({
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                }),
            ],
            exports: [HttpService],
        }
    }
}
