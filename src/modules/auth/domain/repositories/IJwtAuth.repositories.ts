import { User } from "@prisma/client";
import { ValidateAuthDto } from "../dto/validate-auth.dto";

export interface IJwtAuthRepositories {
  signTokenAuth(user: User, expiresIn?: string): Promise<{ access_token: string }>;
  validateTokenAuth(token: string): Promise<ValidateAuthDto>;
}
