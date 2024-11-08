import { Inject, Injectable } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.repositories";
import { ValidateAuthDto } from "../domain/dto/validate-auth.dto";
import { AUTH_SERVICE_TOKEN } from "../utils/authServiceToken";

@Injectable()
export class ValidateTokenAuthService {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authRepositories: IAuthRepositories,
  ) { }

  execute(token: string): Promise<ValidateAuthDto> {
    return this.authRepositories.validateTokenAuth(token);
  }
}
