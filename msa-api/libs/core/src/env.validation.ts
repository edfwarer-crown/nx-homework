import {plainToInstance} from "class-transformer"
import {IsEnum, validateSync} from "class-validator"

export enum Environment {
    Test = "test",
    Local = "local",
    Development = "development",
    Production = "production",
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment

    // @IsNumber()
    // @Min(0)
    // @Max(65535)
    // SERVER_PORT: number
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {enableImplicitConversion: true})
    const errors = validateSync(validatedConfig, {skipMissingProperties: false})

    if (errors.length > 0) {
        throw new Error(errors.toString())
    }
    return validatedConfig
}
