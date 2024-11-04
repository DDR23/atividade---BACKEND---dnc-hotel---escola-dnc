import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import { AuthRegisterDTO } from "./domain/dto/authRegister.dto";
import { AuthResetPasswordDTO } from "./domain/dto/authResetPassword.dto";
import { AuthForgotPasswordDTO } from "./domain/dto/authForgotPassword.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  /**
   * Logs in a user.
   *
   * @param body The user's information
   *
   * @throws {BadRequestException} If the user is not found or the password is incorrect
   *
   * @returns The user's information along with a valid JWT token
   */
  login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  /**
   * Registers a new user.
   *
   * @param body The user's information
   *
   * @throws {BadRequestException} If the user already exists
   *
   * @returns The user's information
   */
  register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Patch('reset-password')
  /**
   * Resets a user's password.
   *
   * @param token The reset token (sent via email)
   * @param password The new password
   *
   * @throws {BadRequestException} If the token is invalid or has expired
   *
   * @returns The user's information
   */
  resetPassword(@Body() { token, password }: AuthResetPasswordDTO) {
    return this.authService.reset({ token, password });
  }

  @Post('forgot-password')
  /**
   * Sends a password recovery email to the user.
   *
   * @param email The user's email address to receive the recovery token.
   *
   * @throws {UnauthorizedException} If the email is incorrect.
   *
   * @returns An object containing the access token as a string.
   */
  forgotPassword(@Body() { email }: AuthForgotPasswordDTO) {
    return this.authService.forgot(email);
  }
}
