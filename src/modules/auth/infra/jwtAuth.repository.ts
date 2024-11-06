import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { IJwtAuthRepositories } from "../domain/repositories/IJwtAuth.repositories";
import { JwtPayload, ValidateAuthDto } from "../domain/dto/validate-auth.dto";
import { User } from "@prisma/client";

@Injectable()
export class JwtAuthRepository implements IJwtAuthRepositories {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async signTokenAuth(user: User, expiresIn: string): Promise<{ access_token: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      name: user.USER_NAME,
    };
    const options: JwtSignOptions = {
      expiresIn: expiresIn,
      issuer: 'dnc_hotel',
      audience: 'users',
    };
    return { access_token: await this.jwtService.signAsync(payload, options) };
  }

  async validateTokenAuth(token: string): Promise<ValidateAuthDto> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'dnc_hotel',
        audience: 'users',
      });
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false };
    }
  }
}