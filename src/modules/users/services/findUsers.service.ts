import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { IUserRepositories } from "../domain/repositories/IUser.repositories";

@Injectable()
export class FindUsersService {
  constructor(
    @Inject('USER_SERVICE_TOKEN')
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(): Promise<User[]> {
    return await this.userRepositories.findUsers();
  }
}
