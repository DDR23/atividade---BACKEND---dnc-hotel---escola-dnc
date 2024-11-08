import { Inject, Injectable } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.repositories";
import { RegisterAuthDto } from "../domain/dto/register-auth.dto";
import { CreateUserDto } from "src/modules/users/domain/dto/create-user.dto";
import { Role } from "@prisma/client";
import { CreateUserService } from "src/modules/users/services/createUser.service";
import { AUTH_SERVICE_TOKEN } from "../utils/authServiceToken";

@Injectable()
export class RegisterAuthService {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authRepositories: IAuthRepositories,
    private readonly createUserService: CreateUserService,
  ) { }

  async execute(data: RegisterAuthDto): Promise<{ access_token: string }> {
    const newUser: CreateUserDto = {
      USER_NAME: data.USER_NAME,
      USER_PASSWORD: data.USER_PASSWORD,
      USER_EMAIL: data.USER_EMAIL,
      USER_ROLE: Role.USER,
    };
    const user = await this.createUserService.execute(newUser);
    return await this.authRepositories.registerAuth(user);
  }
}
