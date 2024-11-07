import { Injectable } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.repositories";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { ValidateAuthDto } from "../domain/dto/validate-auth.dto";

@Injectable()
export class AuthRepository implements IAuthRepositories {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  loginAuth(user: User): Promise<{ access_token: string; }> {
    return this.generateTokenAuth(user)
  }

  registerAuth(user: User): Promise<{ access_token: string; }> {
    return this.generateTokenAuth(user)
  }

  resetAuth(user: User): Promise<{ access_token: string; }> {
    return this.generateTokenAuth(user)
  }

  forgotAuth(user: User): string {
    return `A verification code has been sent to ${user.USER_EMAIL}`;
  }

  async generateTokenAuth(user: User, expiresIn: string = '1d'): Promise<{ access_token: string; }> {
    const payload = {
      sub: user.id,
      name: user.USER_NAME
    };
    const options = {
      expiresIn: expiresIn,
      issuer: 'dnc_hotel',
      audience: 'users',
    };
    return { access_token: await this.jwtService.signAsync(payload, options) }
  }

  async validateTokenAuth(token: string): Promise<ValidateAuthDto> {
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
