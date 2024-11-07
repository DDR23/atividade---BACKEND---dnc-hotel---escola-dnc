import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import { templateHTML } from "./utils/templateHTML";
import { LoginAuthDto } from "./domain/dto/login-auth.dto";
import { RegisterAuthDto } from "./domain/dto/register-auth.dto";
import { CreateUserDto } from "../users/domain/dto/create-user.dto";
import { ResetAuthDto } from "./domain/dto/reset-auth.dto";
import { ValidateAuthDto } from "./domain/dto/validate-auth.dto";
import { FindUserByEmailService } from "../users/services/finduserByEmail.service";
import { CreateUserService } from "../users/services/createUser.service";
import { UpdateUserService } from "../users/services/updateUser.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
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

  async login({ USER_EMAIL, USER_PASSWORD }: LoginAuthDto): Promise<{ access_token: string }> {
    const user = await this.findUserByEmailService.execute(USER_EMAIL);
    if (!user || !(await bcrypt.compare(USER_PASSWORD, user.USER_PASSWORD))) throw new UnauthorizedException('Email or password is incorrect');
    return await this.generateJwtToken(user);
  }

  async register(body: RegisterAuthDto): Promise<{ access_token: string }> {
    const newUser: CreateUserDto = {
      USER_NAME: body.USER_NAME,
      USER_PASSWORD: body.USER_PASSWORD,
      USER_EMAIL: body.USER_EMAIL,
      USER_ROLE: body.USER_ROLE ?? Role.USER,
    }
    const user = await this.createUserService.execute(newUser)
    return await this.generateJwtToken(user);
  }

  async reset({ token, password }: ResetAuthDto): Promise<{ access_token: string }> {
    const { valid, decoded } = await this.validateToken(token);
    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');
    const user = await this.updateUserService.execute(Number(decoded.sub), { USER_PASSWORD: password });
    return await this.generateJwtToken(user);
  }

  async forgot(email: string): Promise<string> {
    const user = await this.findUserByEmailService.execute(email);
    if (!user) throw new UnauthorizedException('Email is incorrect');
    const token = await this.generateJwtToken(user, '30m')
    await this.mailerService.sendMail({
      to: user.USER_EMAIL,
      subject: 'Password recodery - DNC Hotel',
      html: templateHTML(user.USER_NAME, token.access_token),
    });
    return `A verification code has been sent to ${email}`;
  }

  async validateToken(token: string): Promise<ValidateAuthDto> {
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
