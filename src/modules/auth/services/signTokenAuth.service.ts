import { Injectable, Inject } from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtSignOptions } from "@nestjs/jwt";
import { JwtPayload } from "../domain/dto/validate-auth.dto";
import { IJwtAuthRepositories } from "../domain/repositories/IJwtAuth.repositories";

@Injectable()
export class SignTokenAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly jwtAuthRepositories: IJwtAuthRepositories,
  ) { }

  async execute(user: User, expiresIn: string = '1d'): Promise<{ access_token: string }> {
    const accessToken = await this.jwtAuthRepositories.signTokenAuth(user, expiresIn);
    return accessToken;
  }
}
