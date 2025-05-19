import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common"
import {Reflector} from "@nestjs/core"
import {Observable} from "rxjs"
import {UserPayload} from "../../../utils/src/decorator/user.decorator";
import {RoleEnum} from "./role.enum";
import {RoleDto} from "../../../entity/src/prisma";
import {ROLES_KEY} from "./roles.decorator";
import {IS_API_KEY_ACCESSIBLE} from "../authentication/api-key-acessible.decorator";


export const hasRole = (user: UserPayload, requiredRoles: RoleEnum[]) => {
    return requiredRoles.some((role) => user?.roles?.find((roleDto: Partial<RoleDto>) => roleDto.roleCode === role))
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if (!requiredRoles) {
            return true
        }

        const {user} = context.switchToHttp().getRequest()

        if (!user) {
            return this.reflector.getAllAndOverride<boolean>(IS_API_KEY_ACCESSIBLE, [context.getHandler(), context.getClass()])
        }

        return hasRole(user, requiredRoles)
    }
}
