import { Global, Module } from "@nestjs/common";
import { DtoValidator } from "./dtoValidator.helper";
import { AuthHelper } from "./auth.helper";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
    imports:[JwtModule.register({})],
    providers: [DtoValidator, AuthHelper],
    exports: [DtoValidator, AuthHelper]
})

export class HelperModule {}