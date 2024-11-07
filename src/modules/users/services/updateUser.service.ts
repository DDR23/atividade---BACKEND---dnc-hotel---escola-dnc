import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt"
import { IUserRepositories } from "../domain/repositories/IUser.repositories";
import { UpdateUserDto } from "../domain/dto/update-user.dto";

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('USER_SERVICE_TOKEN')
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(id: number, data: UpdateUserDto): Promise<User> {
    await this.userRepositories.findUserById(id);
    if (data.USER_PASSWORD) data.USER_PASSWORD = await bcrypt.hash(data.USER_PASSWORD, 8);
    return await this.userRepositories.updateUser(id, data);
  }
}
