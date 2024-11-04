import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt"
import { userSelectedFields } from "../prisma/utils/userSelectFields";
import { UserCreateDTO } from "./domain/dto/userCreate.dto";
import { UserUpdateDTO } from "./domain/dto/userUpdate.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Get all users.
   *
   * @returns {Promise<User[]>}
   */
  async list(): Promise<User[]> {
    return await this.prisma.user.findMany({ select: userSelectedFields });
  }

  /**
   * Get a user by their ID.
   *
   * @param id The user's ID
   *
   * @throws {NotFoundException} If the user is not found
   *
   * @returns The user
   */
  async show(id: number): Promise<User> {
    const user = this.isIdExists(id);
    return user;
  }

  /**
   * Create a new user.
   *
   * @param body The user's information
   *
   * @throws {BadRequestException} If the user already exists
   *
   * @returns The created user
   */
  async create(body: UserCreateDTO): Promise<User> {
    const user = await this.findByEmail(body.USER_EMAIL);
    if (user) throw new BadRequestException('User already exists');

    body.USER_PASSWORD = await this.hashPassword(body.USER_PASSWORD);
    return await this.prisma.user.create({ data: body, select: userSelectedFields })
  }

  /**
   * Update a user.
   *
   * @param id The user's ID
   * @param body The user's new information
   *
   * @throws {NotFoundException} If the user is not found
   *
   * @returns The updated user
   */
  async update(id: number, body: UserUpdateDTO): Promise<User> {
    await this.isIdExists(id);
    if (body.USER_PASSWORD) body.USER_PASSWORD = await this.hashPassword(body.USER_PASSWORD);
    return await this.prisma.user.update({ where: { id }, data: body, select: userSelectedFields });
  }

  /**
   * Delete a user by their ID.
   *
   * @param id The user's ID
   *
   * @throws {NotFoundException} If the user is not found
   *
   * @returns The deleted user
   */
  async delete(id: number): Promise<User> {
    await this.isIdExists(id);
    return await this.prisma.user.delete({ where: { id } });
  }

  /**
   * Find a user by their email.
   *
   * @param USER_EMAIL The user's email
   *
   * @returns The found user
   */
  async findByEmail(USER_EMAIL: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { USER_EMAIL } })
  }

  /**
   * Checks if a user exists by their ID.
   *
   * @param id The user's ID
   *
   * @throws {NotFoundException} If the user is not found
   *
   * @returns The found user
   */
  private async isIdExists(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id }, select: userSelectedFields });
    if (!user) throw new NotFoundException('User not found')
    return user;
  }

  /**
   * Hashes a password using bcrypt.
   *
   * @param password The password to hash
   *
   * @returns The hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }
}
