import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from "@nestjs/common";
import { LoginAuthDto } from "../domain/dto/login-auth.dto";
import { RegisterAuthDto } from "../domain/dto/register-auth.dto";
import { LoginAuthService } from "../services/loginAuth.service";
import { RegisterAuthService } from "../services/registerAuth.service";
import { ResetAuthDto } from "../domain/dto/reset-auth.dto";
import { ResetAuthService } from "../services/resetAuth.service";
import { ForgotAuthDto } from "../domain/dto/forgot-auth.dto";
import { ForgotAuthService } from "../services/forgotAuth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginAuthService: LoginAuthService,
    private readonly registerAuthService: RegisterAuthService,
    private readonly resetAuthService: ResetAuthService,
    private readonly forgotAuthService: ForgotAuthService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginAuth(
    @Body() data: LoginAuthDto,
  ) {
    return this.loginAuthService.execute(data);
  }

  @Post('register')
  register(
    @Body() data: RegisterAuthDto,
  ) {
    return this.registerAuthService.execute(data);
  }

  @Patch('reset-password')
  resetPassword(
    @Body() data: ResetAuthDto,
  ) {
    return this.resetAuthService.execute(data);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body() data: ForgotAuthDto,
  ) {
    return this.forgotAuthService.execute(data);
  }
}
