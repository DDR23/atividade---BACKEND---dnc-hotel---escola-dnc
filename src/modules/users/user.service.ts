import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async list(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async show(id: number): Promise<User> {
    const user = this.isIdExists(id);
    return user;
  }

  async create(body: CreateUserDTO): Promise<User> {
    body.USER_PASSWORD = await this.hashPassword(body.USER_PASSWORD);
    return await this.prisma.user.create({ data: body })
  }

  async update(id: number, body: UpdateUserDTO): Promise<User> {
    await this.isIdExists(id);
    if (body.USER_PASSWORD) body.USER_PASSWORD = await this.hashPassword(body.USER_PASSWORD);
    return await this.prisma.user.update({ where: { id }, data: body });
  }

  async delete(id: number): Promise<User> {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id } });
  }

  private async isIdExists(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found')
    return user;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 8);
  }
}
