import {forwardRef, MiddlewareConsumer, Module, NestModule} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"
import {APP_FILTER} from "@nestjs/core"

import {validate} from "../env.validation";
import {CommonModule} from "../common/common.module";
import {EncryptionUtils} from "../encryption.utils";
import {isLocal} from "../../../utils/src/node-env";
import {MongoDBModule} from "./mongodb.module";
import {LocalLoggerConfigModule, LoggerConfigModule} from "./logger-config.module";
import {HealthModule} from "../../../health/src";
import {PrismaModule} from "./prisma.module";
import {CustomExceptionFilter} from "../filter/custom-exception.filter";
import {LoggerMiddleware} from "../logger.middleware";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`],
            validate,
        }),
        MongoDBModule,
        ...(isLocal() ? [LocalLoggerConfigModule] : [LoggerConfigModule]),
        HealthModule,
        CommonModule,
        forwardRef(() => PrismaModule),
    ],
    providers: [
        EncryptionUtils,
        {
            provide: APP_FILTER,
            useClass: CustomExceptionFilter,
        },
    ],
    exports: [EncryptionUtils],
})
export class SharedModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes("*")
    }
}
