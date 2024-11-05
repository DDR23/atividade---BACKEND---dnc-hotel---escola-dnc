import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt"
import { userSelectedFields } from "../prisma/utils/userSelectFields";
import { UserCreateDTO } from "./domain/dto/userCreate.dto";
import { UserUpdateDTO } from "./domain/dto/userUpdate.dto";
import { join, resolve } from "path";
import { stat, unlink } from "fs/promises";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async list(): Promise<User[]> {
    return await this.prisma.user.findMany({ select: userSelectedFields });
  }

  async show(id: number): Promise<User> {
    const user = this.isIdExists(id);
    return user;
  }

  async create(body: UserCreateDTO): Promise<User> {
    const user = await this.findByEmail(body.USER_EMAIL);
    if (user) throw new BadRequestException('User already exists');
    body.USER_PASSWORD = await this.hashPassword(body.USER_PASSWORD);
    return await this.prisma.user.create({ data: body, select: userSelectedFields })
  }

  async uploadAvatar(id: number, avatarFileName: string) {
    const user = await this.isIdExists(id);
    const directory = resolve(__dirname, '..', '..', '..', 'uploads', 'users');
    if (user.USER_AVATAR) {
      const userAvatarFilePath = join(directory, user.USER_AVATAR);
      const userAvatarFileExists = await stat(userAvatarFilePath);
      if (userAvatarFileExists) await unlink(userAvatarFilePath);
    }
    const userUpdated = await this.update(id, { USER_AVATAR: avatarFileName });
    return userUpdated;
  }

  async update(id: number, body: UserUpdateDTO): Promise<User> {
    await this.isIdExists(id);
    if (body.USER_PASSWORD) body.USER_PASSWORD = await this.hashPassword(body.USER_PASSWORD);
    return await this.prisma.user.update({ where: { id }, data: body, select: userSelectedFields });
  }

  async delete(id: number): Promise<User> {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(USER_EMAIL: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { USER_EMAIL } })
  }

  private async isIdExists(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id }, select: userSelectedFields });
    if (!user) throw new NotFoundException('User not found')
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }
}
