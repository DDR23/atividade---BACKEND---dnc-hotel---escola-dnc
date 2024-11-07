import { User } from "@prisma/client";
import { ValidateAuthDto } from "../dto/validate-auth.dto";

export interface IAuthRepositories {
  loginAuth(user: User): Promise<{ access_token: string }>;
  registerAuth(user: User): Promise<{ access_token: string }>;
  resetAuth(user: User): Promise<{ access_token: string }>;
  forgotAuth(user: User): string;
  generateTokenAuth(data: User, expiresIn: string): Promise<{ access_token: string }>;
  validateTokenAuth(token: string): Promise<ValidateAuthDto>;
}
