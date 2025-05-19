import {applyDecorators} from "@nestjs/common"
import {ApiTags} from "@nestjs/swagger"

export const Api = ({tag}: {tag?: string} = {tag: null}) => applyDecorators(ApiTags(tag))
