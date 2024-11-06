import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "../domain/dto/create-user.dto";
import { IUserRepositories } from "../domain/repositories/IUser.repositories";

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_SERVICE_TOKEN')
    private readonly userRepositories: IUserRepositories,
  ) { }

  async execute(data: CreateUserDto): Promise<User> {
    const user = await this.userRepositories.findUserByEmail(data.USER_NAME);
    if (user) throw new BadRequestException('User already exists');
    data.USER_PASSWORD = await bcrypt.hash(data.USER_PASSWORD, 8);
    return await this.userRepositories.createUser(data)
  }
}
