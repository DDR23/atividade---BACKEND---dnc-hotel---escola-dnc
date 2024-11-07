import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.repositories";
import { LoginAuthDto } from "../domain/dto/login-auth.dto";
import * as bcrypt from "bcrypt";
import { FindUserByEmailService } from "src/modules/users/services/finduserByEmail.service";

@Injectable()
export class LoginAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly authRepositories: IAuthRepositories,
    private readonly findUserByEmailService: FindUserByEmailService,
  ) { }

  async execute(data: LoginAuthDto): Promise<{ access_token: string }> {
    const user = await this.findUserByEmailService.execute(data.USER_EMAIL);
    if (!user || !(await bcrypt.compare(data.USER_PASSWORD, user.USER_PASSWORD))) throw new UnauthorizedException('Email or password is incorrect');
    return await this.authRepositories.loginAuth(user);
  }
}
