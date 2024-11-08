import { Inject, Injectable } from "@nestjs/common";
import { IUserRepositories } from "../domain/repositories/IUser.repositories";
import { USER_SERVICE_TOKEN } from "../utils/userServiceToken";

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(id: number): Promise<string> {
    await this.userRepositories.findUserById(id);
    const userDeleted = await this.userRepositories.deleteUser(id);
    return `User ${userDeleted.USER_NAME} has been deleted succesfully`
  }
}
