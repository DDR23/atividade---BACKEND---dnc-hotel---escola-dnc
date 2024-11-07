import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginAuthDto } from "./domain/dto/login-auth.dto";
import { RegisterAuthDto } from "./domain/dto/register-auth.dto";
import { ResetAuthDto } from "./domain/dto/reset-auth.dto";
import { ForgotAuthDto } from "./domain/dto/forgot-auth.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() body: LoginAuthDto
  ) {
    return this.authService.login(body);
  }

  @Post('register')
  register(
    @Body() body: RegisterAuthDto
  ) {
    return this.authService.register(body);
  }

  @Patch('reset-password')
  resetPassword(
    @Body() { token, password }: ResetAuthDto
  ) {
    return this.authService.reset({ token, password });
  }

  @Post('forgot-password')
  forgotPassword(
    @Body() { email }: ForgotAuthDto
  ) {
    return this.authService.forgot(email);
  }
}
