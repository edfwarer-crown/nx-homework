import {nativeJs, ZonedDateTime} from "@js-joda/core"
import {BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common"
import {Prisma} from "@prisma/client"
import * as bcrypt from "bcrypt"
import {isEmail, isNotEmpty} from "class-validator"
import phone from "phone"
import validator from "validator"

import {UpdateUserProfileDto} from "@libs/dto/request/update-user-profile.dto"
import {UpdateUserDto} from "@libs/entity/prisma/user/dto/update-user.dto"
import {UserEntity} from "@libs/entity/prisma/user/entities/user.entity"
import {PrismaService} from "@libs/entity/prisma.service"

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)

    constructor(private readonly prisma: PrismaService) {}

    async existsByCellNumber(cellNumber: string) {
        return await this.prisma.user
            .count({
                where: {
                    cellNumber,
                    enabled: true,
                    isDormant: false,
                },
            })
            .then((count) => count > 0)
    }

    async existsByUsername(username: string) {
        return await this.prisma.user
            .count({
                where: {
                    username,
                    enabled: true,
                    isDormant: false,
                },
            })
            .then((count) => count > 0)
    }

    async existsById(userId: string) {
        return await this.prisma.user
            .count({
                where: {
                    id: userId,
                    enabled: true,
                    isDormant: false,
                },
            })
            .then((count) => count > 0)
    }

    async getOneById(userId: string) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
                enabled: true,
                isDormant: false,
            },
        })
    }

    async getOneByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: {
                username,
                enabled: true,
                isDormant: false,
            },
        })
    }

    async getOneByCellNumber(cellNumber: string) {
        return this.prisma.user.findUnique({
            where: {
                cellNumber_enabled: {
                    cellNumber,
                    enabled: true,
                },
                isDormant: false,
            },
        })
    }

    async updatePasswordByUsername(username: string, {password: plainPassword}: UpdateUserDto) {
        const user: Partial<UserEntity> = await this.getOneByUsername(username)

        if (!user || !user.id || !user.username) {
            this.logger.error("업데이트할 User가 없습니다.")
            throw new NotFoundException("User is not exists")
        }
        const params = {
            ...(plainPassword && plainPassword.length > 0
                ? ({
                        password: bcrypt.hashSync(plainPassword, 10),
                        lastPassword: user.password,
                        lastPasswordChanged: new Date(),
                    } as Prisma.UserUpdateInput)
                : {}),
        } as Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>

        if (Object.keys(params).length === 0) {
            this.logger.error("업데이트할 파라미터가 없습니다.")
            throw new InternalServerErrorException("Nothing to update")
        }

        return this.prisma.user.update({
            where: {
                username,
                enabled: true,
                isDormant: false,
            },
            data: {
                ...params,
            },
        })
    }

    async updateByUserId(userId: string, {username, nickname, email, userAppStatus}: UpdateUserProfileDto) {
        const changeNickname = isNotEmpty(nickname)
        const changeUsername = isNotEmpty(username)
        const changingEmail = isNotEmpty(email)

        if (changeUsername) {
            const isDuplicated = await this.checkDuplicate({username})

            if (isDuplicated) {
                throw new ConflictException("기존에 사용하고 있는 사용자 이름 입니다.")
            }
        }

        const {lastNickChanged, email: originalEmail} = await this.prisma.user.findUnique({
            where: {
                id: userId,
                enabled: true,
            },
            select: {
                lastNickChanged: true,
                email: true,
            },
        })

        if (changeNickname) {
            const lastChanged = (lastNickChanged && nativeJs(lastNickChanged)) || null

            if (lastChanged && ZonedDateTime.now().isAfter(lastChanged.plusDays(14))) {
                this.logger.error("It's not available to change. Because of 14-day-rule violation")
                throw new BadRequestException("정책위반 - 사용자 이름은 14일에 한번만 변경 가능")
            }
        }

        if (changingEmail) {
            if (email === originalEmail) {
                throw new BadRequestException("이전 이메일과 동일하게 사용하실 수 없습니다.")
            }

            if (changingEmail && !isEmail(email)) {
                throw new BadRequestException("이메일 양식이 올바르지 않습니다.")
            }
        }

        const params = {
            ...(changeNickname ? {nickname} : {}),
            ...(changeUsername
                ? {
                        username,
                        lastNickChanged: new Date(),
                    }
                : {}),
            ...(changingEmail ? {email} : {}),
        }

        if (Object.keys(params).length === 0) {
            this.logger.error("Nothing to update")
            throw new BadRequestException("업데이트할 파라미터가 없습니다.")
        }

        const isExist = await this.existsById(userId)

        if (!isExist) {
            this.logger.error("User is not exists")
            throw new NotFoundException("업데이트할 User가 없습니다.")
        }

        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...params,
                userAppStatus,
            },
        })
    }

    async checkDuplicate(dto: UpdateUserProfileDto) {
        const {nickname, cellNumber, username, email} = dto

        const nicknameCheck = nickname && nickname.length > 0
        const cellNumberCheck = cellNumber && cellNumber.length > 0
        const usernameCheck = username && username.length > 0

        const emailCheck = email && email.length > 0

        if (nicknameCheck && cellNumberCheck && usernameCheck && emailCheck) {
            this.logger.error("Cannot check multiple values at once.")
            throw new BadRequestException("체크할 파라미터가 여러 개 입니다. 한번에 하나씩 수정 가능합니다.")
        }

        if (cellNumberCheck) {
            const validation = phone("+82 " + cellNumber.substring(1), {
                country: "KR",
                validateMobilePrefix: true,
            })
            if (!validation.isValid) {
                this.logger.error(`CellNumber Pattern is wrong: ${JSON.stringify(validation)}`)
                throw new BadRequestException("전화번호 형식이 잘못되었습니다.")
            }
        }

        if (emailCheck && !validator.isEmail(email)) {
            throw new BadRequestException("이메일 형식이 잘못되었습니다.")
        }

        const params: Prisma.UserWhereInput = {
            ...(nicknameCheck ? {nickname} : {}),
            ...(usernameCheck ? {username} : {}),
            ...(cellNumberCheck // / 기존 회원들은 username이 모두 전화번호로 되어있음.
                ? {
                        OR: [{cellNumber}, {username: cellNumber}],
                    }
                : {}),
            ...(emailCheck ? {email} : {}),
        }

        if (Object.keys(params).length === 0) {
            this.logger.error("Nothing to check")
            throw new InternalServerErrorException("체크할 파라미터가 없습니다.")
        }

        return await this.prisma.user
            .count({
                where: {
                    enabled: true,
                    ...params,
                },
            })
            .then((count) => count > 0)
    }

    async createUserRole(userId: string, roleId: string) {
        return this.prisma.userRole.create({
            data: {
                userId,
                roleId,
                role: {
                    id: roleId,
                },
                user: {
                    ud: userId,
                }
            },
        })
    }

    /**
     * 전화번호로 가입/혹은 탈퇴 계정의 정보를 조회함.
     * @param cellNumber
     */
    async getOneByCellNumberWithMigratedInfo(cellNumber: string): Promise<{id: string, cellNumber: string, token: string, migrated: boolean}> {
        // 가입된 유저 먼저 체크
        const signedUpUser = await this.prisma.user.findUnique({
            where: {
                cellNumber_enabled: {
                    cellNumber: cellNumber,
                    enabled: true,
                },
            },
            select: {
                id: true,
                cellNumber: true,
            },
        })

        if (!!signedUpUser) {
            const customerUserDetail = await this.prisma.customerUserDetail.findUnique({
                where: {
                    id: signedUpUser.id,
                },
                select: {
                    token: true,
                    migrated: true,
                },
            })

            this.logger.debug(`Getting normal info was success - ${cellNumber}`)

            return {
                ...signedUpUser,
                ...customerUserDetail,
            }
        }

        // 이관 혹은 탈퇴한 계정 체크
        const migratedOrWithdrawalUser = await this.prisma.user.findUnique({
            where: {
                cellNumber_enabled: {
                    cellNumber: cellNumber,
                    enabled: false,
                },
            },
            select: {
                id: true,
                cellNumber: true,
            },
        })

        if (!!migratedOrWithdrawalUser) {
            const customerUserDetail = await this.prisma.customerUserDetail.findUnique({
                where: {
                    id: signedUpUser.id,
                },
                select: {
                    token: true,
                    migrated: true,
                },
            })

            this.logger.debug(`Getting migration info was success - ${cellNumber}`)

            return {
                ...migratedOrWithdrawalUser,
                ...customerUserDetail,
            }
        }

        this.logger.warn(`Getting migration info was failed - ${cellNumber}`)

        return null
    }
}
