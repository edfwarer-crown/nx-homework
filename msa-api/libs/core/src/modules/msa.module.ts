import {Module} from "@nestjs/common"
import {ConfigModule, ConfigService} from "@nestjs/config"
import {ClientOptions, ClientsModule} from "@nestjs/microservices"
import {ClientsProviderAsyncOptions} from "@nestjs/microservices/module/interfaces/clients-module.interface"
import {clientsModuleConfig} from "../config";


@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [
                {
                    imports: [ConfigModule.forFeature(clientsModuleConfig)],
                    inject: [ConfigService],
                    name: "MICRO_SERVICE",
                    useFactory: (configService: ConfigService) => {
                        return configService.get<ClientOptions>("clientsModuleConfig")
                    },
                } as ClientsProviderAsyncOptions,
            ],
            isGlobal: true,
        }),
    ],
    exports: [ClientsModule],
})
export class MsaModule {}
