import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async list(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async show(id: string): Promise<User> {
    const user = this.isIdExists(id);
    return user;
  }

  async create(body: any): Promise<User> {
    return await this.prisma.user.create({ data: body })
  }

  async update(id: string, body: any): Promise<User> {
    await this.isIdExists(id);
    return await this.prisma.user.update({ where: { id: Number(id) }, data: body });
  }

  async delete(id: string): Promise<User> {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id: Number(id) } });
  }

  private async isIdExists(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) throw new NotFoundException('User not found')
    return user;
  }
}
