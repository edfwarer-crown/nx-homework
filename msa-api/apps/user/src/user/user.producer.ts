import {Controller} from "@nestjs/common"
import {MessagePattern, Payload} from "@nestjs/microservices"
import {UserService} from "./user.service";
import {UpdateUserDto, UserDto} from "../../../../libs/entity/src/prisma";


@Controller()
export class UserProducer {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({
        cmd: "user.getOne",
    })
    async getUser(@Payload() {userId, cellNumber, username}: {userId?: string, cellNumber?: string, username?: string}): Promise<UserDto> {
        if (userId) {
            return this.userService.getOneById(userId)
        }

        if (username) {
            return this.userService.getOneByUsername(username)
        }

        if (cellNumber) {
            return this.userService.getOneByCellNumber(cellNumber)
        }

        return Promise.reject(null)
    }

    @MessagePattern({
        cmd: "user.exists",
    })
    async existsUser(@Payload() {userId, cellNumber, username}: {userId?: string, cellNumber?: string, username?: string}) {
        if (userId) {
            return this.userService.existsById(userId)
        }

        if (cellNumber) {
            return this.userService.existsByCellNumber(cellNumber)
        }

        if (username) {
            return this.userService.existsByUsername(username)
        }

        return Promise.reject(false)
    }

    @MessagePattern({
        cmd: "user.change-password",
    })
    async updateUser(@Payload() {username, password}: UpdateUserDto) {
        return this.userService.updatePasswordByUsername(username, {password})
    }

    @MessagePattern({
        cmd: "user.sign-up-from-migration",
    })
    async signUpFromMigration(@Payload() form: UpdateUserDto & {id: string}) {
        const {id, ...dto} = form
        return this.userService.updateByUserId(id, dto)
        // return this.userService.updatePasswordByUsername(username, {password, paymentPassword})
    }

    @MessagePattern({
        cmd: "user.createRole",
    })
    async createUserRole(@Payload() {userId, role}: {userId: string, role: string}) {
        return this.userService.createUserRole(userId, role)
    }

    @MessagePattern({
        cmd: "user.getMigratedInfo",
    })
    async getOneByIdForAlimtalk(@Payload() user: {userId: number}) {
        const userData = await this.userService.getOneById(user.userId + "")
        return this.userService.getOneByCellNumberWithMigratedInfo(userData.cellNumber)
    }

}
