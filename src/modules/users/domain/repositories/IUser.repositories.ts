import { User } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface IUserRepositories {
  createUser(data: CreateUserDto): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: number): Promise<User>;
  findUsers(): Promise<User[]>;
  updateUser(id: number, data: UpdateUserDto): Promise<User>;
  uploadImageUser(id: number, imageFile: UpdateUserDto): Promise<User>;
  deleteUser(id: number): Promise<User>;
}
