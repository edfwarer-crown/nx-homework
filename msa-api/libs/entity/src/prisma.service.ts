import {Injectable, Logger, OnModuleInit} from "@nestjs/common"
import {Prisma, PrismaClient} from "@prisma/client"
import {readReplicas} from "@prisma/extension-read-replicas"

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, "query" | "info" | "warn" | "error"> implements OnModuleInit {
    private readonly logger: Logger = new Logger(PrismaService.name)

    constructor() {
        super({
            log: [
                {
                    emit: "event",
                    level: "query",
                },
                {
                    emit: "event",
                    level: "error",
                },
                {
                    emit: "stdout",
                    level: "info",
                },
                {
                    emit: "stdout",
                    level: "warn",
                },
            ],
        })

        if (process.env.DATABASE_READ_URL && process.env.DATABASE_READ_URL !== "") {
            this.$extends(
                readReplicas({
                    url: process.env.DATABASE_READ_URL,
                }),
            )
        }
    }

    async onModuleInit() {
        this.$on("error", (event) => {
            this.logger.error(event.target)
        })
        await this.$connect()
    }
}
