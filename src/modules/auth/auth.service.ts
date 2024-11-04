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
import { MailerService } from "@nestjs-modules/mailer";
import { templateHTML } from "./utils/templateHTML";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) { }

  async generateJwtToken(user: User, expiresIn: string = '1d'): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.USER_NAME };
    const options = {
      expiresIn: expiresIn,
      issuer: 'dnc_hotel',
      audience: 'users',
    };
    return { access_token: await this.jwtService.signAsync(payload, options) }
  }

  async login({ USER_EMAIL, USER_PASSWORD }: AuthLoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(USER_EMAIL);
    if (!user || !(await bcrypt.compare(USER_PASSWORD, user.USER_PASSWORD))) throw new UnauthorizedException('Email or password is incorrect');
    return await this.generateJwtToken(user);
  }

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

  async reset({ token, password }: AuthResetPasswordDTO): Promise<{ access_token: string }> {
    const { valid, decoded } = await this.validateToken(token);
    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');
    const user = await this.userService.update(Number(decoded.sub), { USER_PASSWORD: password });
    return await this.generateJwtToken(user);
  }

  async forgot(email: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email is incorrect');
    const token = await this.generateJwtToken(user, '30m')
    await this.mailerService.sendMail({
      to: user.USER_EMAIL,
      subject: 'Password recodery - DNC Hotel',
      html: templateHTML(user.USER_NAME, token.access_token),
    });
    return `A verification code has been sent to ${email}`;
  }

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
