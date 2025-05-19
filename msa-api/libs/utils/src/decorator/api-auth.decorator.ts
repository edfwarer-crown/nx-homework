import {applyDecorators} from "@nestjs/common"
import {ApiBasicAuth, ApiBearerAuth} from "@nestjs/swagger"

export const ApiAuth = ({basic, bearer}: {basic?: string, bearer?: string}) => applyDecorators(ApiBasicAuth(basic), ApiBearerAuth(bearer))
