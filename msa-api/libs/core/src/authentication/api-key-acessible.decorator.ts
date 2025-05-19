import {applyDecorators, SetMetadata, UseGuards} from "@nestjs/common"
import {ApiKeyGuard} from "./api-key.guard";


export const IS_API_KEY_ACCESSIBLE = "isApiKeyAccessible"
export const ApiKeyAccessible = () => applyDecorators(SetMetadata(IS_API_KEY_ACCESSIBLE, true), UseGuards(ApiKeyGuard))
