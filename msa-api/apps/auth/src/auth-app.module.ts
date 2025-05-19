import {Module} from "@nestjs/common"
import {AuthApiModule} from "./auth-api.module";


@Module({
    imports: [AuthApiModule],
})
export class AuthAppModule {}
