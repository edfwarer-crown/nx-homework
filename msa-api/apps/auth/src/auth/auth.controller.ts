import {BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, Inject, Logger, NotImplementedException, Post, Req, Request, UnsupportedMediaTypeException, Version} from "@nestjs/common"
import {ClientProxy} from "@nestjs/microservices"
import {ApiBody, ApiConsumes, ApiResponse} from "@nestjs/swagger"
import {isEmail, isNotEmpty} from "class-validator"
import {FastifyRequest} from "fastify"
import {customAlphabet} from "nanoid"
import phone from "phone"
import {firstValueFrom} from "rxjs"
import {JwtService} from "@nestjs/jwt";
import {Api} from "../../../../libs/utils/src/decorator/common-api.decorator";
import {AuthService} from "./auth.service";
import {UserSignUpService} from "./user-sign-up.service";
import {Operation} from "../../../../libs/utils/src/decorator/common-operation.decorator";
import {SignInFormDto} from "../../../../libs/dto/src/sign-in-form.dto";
import {User, UserPayload} from "../../../../libs/utils/src/decorator/user.decorator";
import {SignOutFormDto} from "../../../../libs/dto/src/request/sign-out-form.dto";
import {SignUpFormV1_1Dto} from "../../../../libs/dto/src/request/sign-up-form-V1_1.dto";
import {CreateUserDto, RoleDto, UserEntity} from "../../../../libs/entity/src/prisma";
import {TermOfServiceType} from "../../../../libs/dto/src/enums";

@Api({tag: "유저 API - 인증"})
@Controller()
export class AuthController {
    private readonly logger = new Logger(AuthController.name)
    private readonly codeGenerator = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_.", 12)

    constructor(
        @Inject("MICRO_SERVICE") private clientProxy: ClientProxy,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly userSignUpService: UserSignUpService,
    ) {
    }

    @Operation({
        response: String,
        auth: false,
        public: true,
        summary: "로그인",
        description: "로그인",
    })
    @ApiConsumes("application/x-www-form-urlencoded")
    @ApiResponse({
        status: 400,
        description: "필수 파라미터 누락",
    })
    @HttpCode(HttpStatus.OK)
    @Post("sign-in")
    async signIn(@Req() req: Request, @Body() data: SignInFormDto) {
        const header = req.headers["X-PAW-TOKEN"]

        const {
            username,
            password,
        } = data

        if (!(username || (header && password))) {
            throw new BadRequestException()
        }

        if (!data.type) {
            data.type = "CELL_NUMBER"
        }

        return await this.authService.signIn(data.type, username, password)
    }

    @Operation({
        response: Boolean,
        summary: "로그아웃",
        description: "기본적으로 현재 사용하는 인증 Token을 차단함.<br/><b>Swagger에서는 인증과 관련된 Header를 입력할 수 설정이 아직 없네요. 상단의 [Authorize]를 통해서만 작동해요. T-T</b>",
    })
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 415,
        description: "허용되지 않는 토큰",
    })
    @Post("sign-out")
    async signOut(@Req() req: any, @User() user: UserPayload, @Body() body?: SignOutFormDto) {
        const [type, token] = req.headers.authorization?.split(" ")
        if (type.toUpperCase() !== "BEARER") {
            throw new UnsupportedMediaTypeException(`${type} token is not supported.`)
        }
        return await this.authService.banToken(token)
    }

    @Operation({
        auth: false,
        public: true,
        summary: "회원 가입",
        description: "회원 가입",
    })
    @ApiBody({
        type: SignUpFormV1_1Dto,
    })
    @ApiConsumes("application/x-www-form-urlencoded")
    @HttpCode(HttpStatus.OK)
    @Version("1.1")
    @Post("sign-up")
    async signUpV1_1(@Req() req: FastifyRequest, @Body() form: SignUpFormV1_1Dto) {
        if (isNotEmpty(form.username)) {
            const existsUsername = await firstValueFrom(this.clientProxy.send<boolean>({cmd: "user.exists"}, {username: form.username}).pipe()).catch(() => {
                return null
            })

            if (existsUsername) {
                throw new ConflictException("USERNAME_IS_ALREADY_EXISTS")
            }
        } else {
            // 12자리의 랜텀 문자열 생성 -> 추후 국제화시 25자리로 바뀔수도 있음 by.영현
            form.username = this.codeGenerator()
        }

        // 이메일 검증(이메일 회원 가입 시)
        const {email} = this.jwtService.decode(form.email) ?? {email: null}
        if (email && !isEmail(email)) {
            throw new BadRequestException("UNVALID_EMAIL")
        }

        // cellNumber 검증
        const {cellNumber} = this.jwtService.decode(form.cellNumber) ?? {cellNumber: null}
        if (cellNumber) {
            const validation = phone("+82 " + cellNumber.substring(1), {
                country: "KR",
                validateMobilePrefix: true,
            })
            if (!validation.isValid) {
                throw new BadRequestException("UNVALID_CELLNUMBER")
            }
        } else {
            throw new BadRequestException("TIME_OUT")
        }

        const user = await firstValueFrom(
            this.clientProxy
                .send<
                    UserEntity & {
                        role: Partial<RoleDto>
                    }
            >({cmd: "user.getOne"}, {cellNumber: cellNumber})
                .pipe(),
        ).catch(() => {
            // 정상 - 계정이 없음
            return null
        })

        if (user && user.enabled && (user.userAppStatus == "UA_SIGN_UP" || user.userAppStatus == "UA_IN_USED")) {
            throw new BadRequestException("이미 가입된 계정 입니다.")
        }

        const createdUser = await Promise.resolve(!!user).then((exists) => {
            return this.userSignUpService.signUpUser({
                username: form.username,
                password: form.password ? form.password : "SOCIAL",
                cellNumber: cellNumber,
                birthday: null,
                email,
                gender: 0,
                fullname: (form.provider && form.idToken) ? `${form.provider}|${form.idToken}` : form.username,
            } as CreateUserDto)
        })

        if (!createdUser || !createdUser.id) {
            throw new BadRequestException("CANNOT CREATE USER")
        }

        if (form.agreements && form.agreements.length > 0) {
            await Promise.all(
                form.agreements.map(async (agreement) => {
                    await firstValueFrom(
                        this.clientProxy
                            .send<{
                            id: number
                        }>(
                                {cmd: "policy.create"},
                                {
                                    userId: createdUser.id,
                                    type: TermOfServiceType[agreement],
                                },
                            )
                            .pipe(),
                    )
                }),
            )
        }

        return await this.authService.signIn("USERNAME", form.username, form.password)
    }
}
