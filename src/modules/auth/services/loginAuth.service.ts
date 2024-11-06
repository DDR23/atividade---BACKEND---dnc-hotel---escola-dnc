import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { LoginAuthDto } from "../domain/dto/login-auth.dto";
import { IAuthRepositories } from "../domain/repositories/IAuth.reposirories";
import { IUserRepositories } from "src/modules/users/domain/repositories/IUser.repositories";

@Injectable()
export class LoginAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly authRepositories: IAuthRepositories,
    @Inject('USER_SERVICE_TOKEN')
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(data: LoginAuthDto): Promise<{ access_token: string }> {
    const user = await this.userRepositories.findUserByEmail(data.USER_EMAIL);
    if (!user || !(await bcrypt.compare(data.USER_PASSWORD, user.USER_PASSWORD))) throw new UnauthorizedException('Email or password is incorrect');
    return await this.authRepositories.loginAuth(user);
  }
}
