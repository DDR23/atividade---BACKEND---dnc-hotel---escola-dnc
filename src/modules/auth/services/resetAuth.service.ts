import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ResetAuthDto } from "../domain/dto/reset-auth.dto";
import { IUserRepositories } from "src/modules/users/domain/repositories/IUser.repositories";
import { IJwtAuthRepositories } from "../domain/repositories/IJwtAuth.repositories";

@Injectable()
export class ResetAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly jwtAuthRepositories: IJwtAuthRepositories,
    @Inject('USER_SERVICE_TOKEN')
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(data: ResetAuthDto): Promise<{ access_token: string }> {
    const { valid, decoded } = await this.jwtAuthRepositories.validateTokenAuth(data.token);
    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');
    const user = await this.userRepositories.updateUser(Number(decoded.sub), { USER_PASSWORD: data.password });
    return await this.jwtAuthRepositories.signTokenAuth(user);
  }
}
