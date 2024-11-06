import { User } from "@prisma/client";

export interface IAuthRepositories {
  loginAuth(data: User): Promise<{ access_token: string }>;
  registerAuth(data: User): Promise<{ access_token: string }>;
  resetAuth(data: User): Promise<{ access_token: string }>;
  forgotAuth(data: User): string;
}
