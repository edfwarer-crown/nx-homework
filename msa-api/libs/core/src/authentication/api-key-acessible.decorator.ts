import {applyDecorators, SetMetadata, UseGuards} from "@nestjs/common"

import {ApiKeyGuard} from "@libs/core/authentication/api-key.guard"
import {Public} from "@libs/utils/decorator"

export const IS_API_KEY_ACCESSIBLE = "isApiKeyAccessible"
export const ApiKeyAccessible = () => applyDecorators(SetMetadata(IS_API_KEY_ACCESSIBLE, true), UseGuards(ApiKeyGuard), Public)
