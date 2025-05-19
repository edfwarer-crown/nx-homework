import {Controller} from "@nestjs/common"
import {MessagePattern, Payload} from "@nestjs/microservices"
import {AuthService} from "./auth.service";
import {SignInFormDto} from "../../../../libs/dto/src/sign-in-form.dto";


@Controller()
export class AuthProducer {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({
        cmd: "auth.validateUser",
    })
    async validate(@Payload() {username, password}: SignInFormDto) {
        return this.authService.validateUser("USERNAME", username, password)
    }
}
