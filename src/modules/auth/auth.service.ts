import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  async generateJwtToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.USER_NAME };
    const options = { expiresIn: '1d' };
    return { access_token: await this.jwtService.signAsync(payload, options) }
  }

  async login({ USER_EMAIL, USER_PASSWORD }: AuthLoginDTO): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { USER_EMAIL } });
    if (!user || !(await bcrypt.compare(USER_PASSWORD, user.USER_PASSWORD))) throw new UnauthorizedException('Email or password is incorrect');
    return await this.generateJwtToken(user);
  }
}
