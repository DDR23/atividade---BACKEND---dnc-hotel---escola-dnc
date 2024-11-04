import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role, User } from "@prisma/client";
import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import * as bcrypt from "bcrypt";
import { UserService } from "../users/user.service";
import { AuthRegisterDTO } from "./domain/dto/authRegister.dto";
import { AuthResetPasswordDTO } from "./domain/dto/authResetPassword.dto";
import { AuthValidateTokenDTO } from "./domain/dto/authValidateToken.dto";
import { UserCreateDTO } from "../users/domain/dto/userCreate.dto";

@Injectable()
export class AuthService {
  /**
   * Constructs an instance of AuthService.
   *
   * @param jwtService - The JwtService used for generating and validating JWT tokens.
   * @param userService - The UserService used for user-related operations.
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  /**
   * Generates a JSON Web Token (JWT) for a given user.
   *
   * @param user - The user for whom the token is generated.
   * @param expiresIn - The duration for which the token is valid. Defaults to '1d'.
   * 
   * @returns An object containing the access token as a string.
   */
  async generateJwtToken(user: User, expiresIn: string = '1d'): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.USER_NAME };
    const options = {
      expiresIn: expiresIn,
      issuer: 'dnc_hotel',
      audience: 'users',
    };
    return { access_token: await this.jwtService.signAsync(payload, options) }
  }

  /**
   * Logs in a user by their email and password.
   *
   * @param {AuthLoginDTO} body - The user's email and password.
   * 
   * @returns A promise of an object containing the access token as a string.
   *
   * @throws {UnauthorizedException} If the email or password is incorrect.
   */
  async login({ USER_EMAIL, USER_PASSWORD }: AuthLoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(USER_EMAIL);
    if (!user || !(await bcrypt.compare(USER_PASSWORD, user.USER_PASSWORD))) throw new UnauthorizedException('Email or password is incorrect');
    return await this.generateJwtToken(user);
  }

  /**
   * Registers a new user, creates a JWT token for them, and returns the token.
   *
   * @param {AuthRegisterDTO} body - The user's registration details.
   * 
   * @returns A promise of an object containing the access token as a string.
   *
   * @throws {BadRequestException} If the user already exists.
   */
  async register(body: AuthRegisterDTO): Promise<{ access_token: string }> {
    const newUser: UserCreateDTO = {
      USER_NAME: body.USER_NAME,
      USER_PASSWORD: body.USER_PASSWORD,
      USER_EMAIL: body.USER_EMAIL,
      USER_ROLE: body.USER_ROLE ?? Role.USER,
    }
    const user = await this.userService.create(newUser)
    return await this.generateJwtToken(user);
  }

  /**
   * Resets the user's password using a provided token.
   *
   * @param {AuthResetPasswordDTO} param0 - An object containing the JWT token and new password.
   *
   * @returns A promise of an object containing the new access token as a string.
   *
   * @throws {UnauthorizedException} If the token is invalid or decoding fails.
   */
  async reset({ token, password }: AuthResetPasswordDTO): Promise<{ access_token: string }> {
    const { valid, decoded } = await this.validateToken(token);
    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');
    const user = await this.userService.update(Number(decoded.sub), { USER_PASSWORD: password });
    return await this.generateJwtToken(user);
  }

  /**
   * Forgot password endpoint.
   *
   * @param {string} email - The user's email to receive the recovery token.
   * 
   * @returns A promise of an object containing the access token as a string.
   *
   * @throws {UnauthorizedException} If the email is incorrect.
   */
  async forgot(email: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email is incorrect');
    const token = this.generateJwtToken(user, '30m')
    //logica de disparo de email de recuperação de senha
    return token;
  }

  /**
   * Validates a JWT token and returns its decoded content if valid.
   *
   * @param {string} token - The JWT token to validate.
   *
   * @returns A promise of an object containing a boolean indicating if the token is valid and the decoded token content if valid.
   *
   * @throws {UnauthorizedException} If the token is invalid or verification fails.
   */
  async validateToken(token: string): Promise<AuthValidateTokenDTO> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'dnc_hotel',
        audience: 'users',
      })
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false };
    }
  }
}
