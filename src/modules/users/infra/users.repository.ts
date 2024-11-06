import { Injectable } from "@nestjs/common";
import { IUserRepositories } from "../domain/repositories/IUser.repositories";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "../domain/dto/create-user.dto";
import { userSelectedFields } from "src/modules/prisma/utils/userSelectFields";
import { UpdateUserDto } from "../domain/dto/update-user.dto";

@Injectable()
export class UserRepository implements IUserRepositories {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data, select: userSelectedFields });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { USER_EMAIL: email } });
  }

  findUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id }, select: userSelectedFields });
  }

  findUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: data });
  }

  uploadImageUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: data });
  }

  deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
