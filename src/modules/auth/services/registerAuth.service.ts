import { Inject, Injectable } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.reposirories";
import { IUserRepositories } from "src/modules/users/domain/repositories/IUser.repositories";
import { RegisterAuthDto } from "../domain/dto/register-auth.dto";
import { CreateUserDto } from "src/modules/users/domain/dto/create-user.dto";
import { Role } from "@prisma/client";

@Injectable()
export class RegisterAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly authRepositories: IAuthRepositories,
    @Inject('USER_SERVICE_TOKEN')
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(data: RegisterAuthDto): Promise<{ access_token: string }> {
    const newUser: CreateUserDto = {
      USER_NAME: data.USER_NAME,
      USER_PASSWORD: data.USER_PASSWORD,
      USER_EMAIL: data.USER_EMAIL,
      USER_ROLE: data.USER_ROLE ?? Role.USER,
    }
    const user = await this.userRepositories.createUser(newUser);
    return await this.authRepositories.registerAuth(user);
  }
}
