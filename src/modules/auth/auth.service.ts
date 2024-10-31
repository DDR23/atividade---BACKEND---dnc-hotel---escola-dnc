import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role, User } from "@prisma/client";
import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { UserService } from "../users/user.service";
import { AuthRegisterDTO } from "./domain/dto/authRegister.dto";
import { CreateUserDTO } from "../users/domain/dto/createUser.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) { }

  async generateJwtToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.USER_NAME };
    const options = { expiresIn: '1d' };
    return { access_token: await this.jwtService.signAsync(payload, options) }
  }

  async login({ USER_EMAIL, USER_PASSWORD }: AuthLoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(USER_EMAIL);
    if (!user || !(await bcrypt.compare(USER_PASSWORD, user.USER_PASSWORD))) throw new UnauthorizedException('Email or password is incorrect');
    return await this.generateJwtToken(user);
  }

  async register(body: AuthRegisterDTO): Promise<{ access_token: string }> {
    const newUser: CreateUserDTO = {
      USER_NAME: body.USER_NAME,
      USER_PASSWORD: body.USER_PASSWORD,
      USER_EMAIL: body.USER_EMAIL,
      USER_ROLE: body.USER_ROLE ?? Role.USER,
    }
    const user = await this.userService.create(newUser)
    return await this.generateJwtToken(user);
  }
}
