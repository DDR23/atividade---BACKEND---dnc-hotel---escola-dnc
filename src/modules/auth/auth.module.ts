import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./infra/auth.controller";
import { UserModule } from "../users/user.module";
import { LoginAuthService } from "./services/loginAuth.service";
import { RegisterAuthService } from "./services/registerAuth.service";
import { ResetAuthService } from "./services/resetAuth.service";
import { ForgotAuthService } from "./services/forgotAuth.service";
import { SignTokenAuthService } from "./services/signTokenAuth.service";
import { ValidateTokenAuthService } from "./services/validateTokenAuth.service";

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET, }),
    PrismaModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    LoginAuthService,
    RegisterAuthService,
    ResetAuthService,
    ForgotAuthService,
    SignTokenAuthService,
    ValidateTokenAuthService,
  ],
})
export class AuthModule { }
