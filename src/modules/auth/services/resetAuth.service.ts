import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.repositories";
import { ResetAuthDto } from "../domain/dto/reset-auth.dto";
import { UpdateUserService } from "src/modules/users/services/updateUser.service";
import { AUTH_SERVICE_TOKEN } from "../utils/authServiceToken";

@Injectable()
export class ResetAuthService {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authRepositories: IAuthRepositories,
    private readonly updateUserService: UpdateUserService,
  ) { }

  async execute(data: ResetAuthDto): Promise<{ access_token: string }> {
    const { valid, decoded } = await this.authRepositories.validateTokenAuth(data.token);
    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');
    const user = await this.updateUserService.execute(Number(decoded.sub), { USER_PASSWORD: data.password });
    return await this.authRepositories.resetAuth(user);
  }
}
