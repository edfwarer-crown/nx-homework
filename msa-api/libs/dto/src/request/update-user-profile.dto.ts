import {PickType} from "@nestjs/swagger"
import {UpdateUserDto} from "../../../entity/src/prisma";


export class UpdateUserProfileDto extends PickType(UpdateUserDto, [
    "username",
    "fullname",
    "cellNumber",
    "nickname",
    "email",
    "userAppStatus",
] as const) {}
