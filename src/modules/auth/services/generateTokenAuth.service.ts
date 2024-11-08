import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { IAuthRepositories } from "../domain/repositories/IAuth.repositories";
import { AUTH_SERVICE_TOKEN } from "../utils/authServiceToken";

@Injectable()
export class GenerateTokenAuthService {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authRepositories: IAuthRepositories,
  ) { }

  execute(user: User, expiresIn: string = '1d'): Promise<{ access_token: string }> {
    return this.authRepositories.generateTokenAuth(user, expiresIn);
  }
}
