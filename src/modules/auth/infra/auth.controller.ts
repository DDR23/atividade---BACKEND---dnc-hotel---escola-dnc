import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from "@nestjs/common";
import { LoginAuthService } from "../services/loginAuth.service";
import { RegisterAuthService } from "../services/registerAuth.service";
import { ResetAuthService } from "../services/resetAuth.service";
import { ForgotAuthService } from "../services/forgotAuth.service";
import { LoginAuthDto } from "../domain/dto/login-auth.dto";
import { RegisterAuthDto } from "../domain/dto/register-auth.dto";
import { ResetAuthDto } from "../domain/dto/reset-auth.dto";
import { ForgotAuthDto } from "../domain/dto/forgot-auth.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private loginAuthService: LoginAuthService,
    private registerAuthService: RegisterAuthService,
    private resetAuthService: ResetAuthService,
    private forgotAuthService: ForgotAuthService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
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
