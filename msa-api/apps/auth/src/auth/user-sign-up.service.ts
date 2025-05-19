import {Injectable, Logger} from "@nestjs/common"
import * as bcrypt from "bcrypt"
import {PrismaService} from "../../../../libs/entity/src/prisma.service";
import {CreateUserDto} from "../../../../libs/entity/src/prisma";

@Injectable()
export class UserSignUpService {
    private readonly logger = new Logger(UserSignUpService.name)

    constructor(private readonly prisma: PrismaService) {}

    async signUpUser(dto: CreateUserDto) {
        const {username, password, birthday, gender, fullname, cellNumber, email} = dto
        return this.prisma.$transaction(async (tx) => {
            const createUser = await tx.user.create({
                data: {
                    username,
                    nickname: fullname,
                    fullname,
                    language: "ko",
                    cellNumber,
                    gender: gender as number,
                    password: bcrypt.hashSync(password, 10),
                    lastPasswordChanged: new Date(),
                    birthday,
                    email,
                    primaryRoleId: 6 + "",
                    enabled: true,
                    partnerUserDetails: null,
                    partnerUserRoles: null,
                    userRoles: null,
                    UserMetas: null,
                    Compensation: null,
                },
            })
            // 일반 사용자로 role 등록(6)
            await tx.userRole.create({
                data: {
                    userId: createUser.id + "",
                    roleId: 6 + "",
                    role: null,
                    user: createUser,
                },
            })

            return createUser
        })
    }
}
