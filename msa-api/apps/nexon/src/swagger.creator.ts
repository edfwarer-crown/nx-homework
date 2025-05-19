import {INestApplication} from "@nestjs/common"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"
import {SwaggerCustomOptions} from "@nestjs/swagger/dist/interfaces"
import {merge} from "ts-deepmerge"
import {AuthApiModule} from "../../auth/src/auth-api.module";
import {UserAppModule} from "../../user/src/user-app.module";


type SwaggerApi = {
    key: string
    title: string
    description?: string
    uri: string
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    modules?: Function[]
}

const apiConfigs: SwaggerApi[] = [
    {
        key: "auth",
        title: "인증",
        uri: "api-docs/auth",
        modules: [AuthApiModule],
    },
    {
        key: "user",
        title: "유저",
        uri: "api-docs/user",
        modules: [UserAppModule],
    },
]

export const swaggerCreate = (app: INestApplication) => {
    for (const api of apiConfigs) {
        SwaggerModule.setup(
            api.uri,
            app,
            SwaggerModule.createDocument(
                app,
                createDocument(api.title, api.description).build(),
                {
                    include: api.modules,
                },
            ),
            {
                ...nestSwaggerOption,
                jsonDocumentUrl: `/${api.uri}/swagger.json`,
            },
        )
    }

    SwaggerModule.setup(
        "docs",
        app,
        SwaggerModule.createDocument(app, createDocument("Nexon").build()),
        merge({
            ...nestSwaggerOption,
            jsonDocumentUrl: "/api-docs/swagger.json",
            yamlDocumentUrl: "/api-docs/swagger.yaml",
            explorer: true,
            swaggerOptions: {
                authAction: {
                    token: {
                        name: "token",
                        schema: {
                            type: "http",
                            scheme: "bearer",
                            name: "JWT",
                            bearerFormat: "JWT",
                            in: "header",
                        },
                        value:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTAtNjgxMi03ODAyIiwiZGV0YWlsIjp7InVzZXJJZCI6OSwidXNlcm5hbWUiOiIwMTAtNjgxMi03ODAyIiwiZW1haWwiOiJwYXdkbHlAcGF3ZGx5LmNvbSIsInJvbGUiOiJVU0VSIn0sImlhdCI6MTczMTU3MTgyOSwiZXhwIjoxNzYzMTA3ODI5fQ.ztLei4H98eO7yqWowD3B4POEOrVnoGmsveHdd3XdUNI",
                    },
                },
                docExpansion: "none",
                deepLinking: true,
                filter: true,
                defaultModelsExpandDepth: -1,
                defaultModelExpandDepth: 4,
                uiConfig: {
                    tagsSorter: "alpha",
                    operationsSorter: "method",
                    displayRequestDuration: true,
                },
                urls: [
                    {
                        name: "00. 모든",
                        url: "/api-docs/swagger.json",
                    },
                    ...apiConfigs.map((apiConfig, index) => {
                        return {
                            name: `${("0000" + (index + 1).toString(16)).slice(-2).toUpperCase()}. ${apiConfig.title} API`,
                            url: `/${apiConfig.uri}/swagger.json`,
                        }
                    }),
                ],
            },
        }),
    )
}

const nestSwaggerOption: SwaggerCustomOptions = {
    customCss:
    ".swagger-ui .info li { line-height: 1.6; font-size: 16px !important; } .opblock-description-wrapper p, .opblock-description-wrapper ul li { line-height: 1.6; font-size: 16px !important; }",
}

const createDocument = (name: string, description?: string) => {
    return new DocumentBuilder()
        .setTitle("NestJS API - " + name)
        .setDescription(
            (description && description)
            || "<!--01-01-2025 <ul><li>기본으로 Bearer 토큰을 적용시켰습니다.</li></ul><br/>-->??-??-2024 <ul><li>deprecated 처리된 endpoint는 개발이 덜된 endpoint입니다.</li></ul>",
        )
        .setVersion("1.0.0")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                name: "JWT",
                bearerFormat: "JWT",
                description: "",
                in: "header",
            },
            "token",
        )
        .addBasicAuth(
            {
                type: "http",
                description: "",
            },
            "basic",
        )
}
