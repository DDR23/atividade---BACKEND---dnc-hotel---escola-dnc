import { Inject, Injectable } from "@nestjs/common";
import { ValidateAuthDto } from "../domain/dto/validate-auth.dto";
import { IJwtAuthRepositories } from "../domain/repositories/IJwtAuth.repositories";

@Injectable()
export class ValidateTokenAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly jwtAuthRepositories: IJwtAuthRepositories,
  ) { }

  async execute(token: string): Promise<ValidateAuthDto> {
    return await this.jwtAuthRepositories.validateTokenAuth(token);
  }
}
