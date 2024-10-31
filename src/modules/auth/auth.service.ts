import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async generateJwtToken(user: User) {
    const payload = { sub: user.id, name: user.USER_NAME };
    const options = { expiresIn: '1d' };
    return { access_token: await this.jwtService.signAsync(payload, options) }
  }
}
