import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { IUserRepositories } from "../domain/repositories/IUser.repositories";
import { USER_SERVICE_TOKEN } from "../utils/userServiceToken";

@Injectable()
export class FindUserByEmailService {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(email: string): Promise<User> {
    return await this.userRepositories.findUserByEmail(email)
  }
}
