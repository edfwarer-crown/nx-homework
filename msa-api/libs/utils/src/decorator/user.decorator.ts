import {createParamDecorator, ExecutionContext} from "@nestjs/common"
import {FastifyRequest} from "fastify"
import {RoleDto, UserEntity} from "../../../entity/src/prisma";


export type UserPayload = {
    userId: string
    username: string
    fullname: string
    email: string
    role?: Partial<RoleDto>

    roles: Partial<RoleDto>[]

    beautyShop?: {[key in string]: string}
    vendorInfo?: {[key in string]: string}
}

export const getUserPayloadFrom = (user: Partial<UserEntity>): UserPayload => {
    const roles = [
        {
            id: user.userRoles,
        },
        ...[user.userRoles, user.partnerUserRoles].flatMap(
            (entities) =>
                    (entity) =>
                        ({
                            id: entity.role.id,
                            roleCode: entity.role.roleCode,
                            roleTitle: entity.role.roleTitle,
                        }) as RoleDto,
        ),
    ]

    return {
        userId: user.id + "",
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        // roles: removeDuplicate(roles, (a, b) => a === b),
        roles: null,
    }
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest & {user: UserPayload}>()
    return request.user
})
