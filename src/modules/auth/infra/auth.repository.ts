import { Injectable } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.reposirories";
import { User } from "@prisma/client";
import { IJwtAuthRepositories } from "../domain/repositories/IJwtAuth.repositories";

@Injectable()
export class AuthRepository implements IAuthRepositories {
  constructor(
    private readonly jwtAuthRepositories: IJwtAuthRepositories,
  ) { }

  loginAuth(data: User): Promise<{ access_token: string }> {
    return this.jwtAuthRepositories.signTokenAuth(data);
  }

  registerAuth(data: User): Promise<{ access_token: string; }> {
    return this.jwtAuthRepositories.signTokenAuth(data);
  }

  resetAuth(data: User): Promise<{ access_token: string; }> {
    return this.jwtAuthRepositories.signTokenAuth(data);
  }

  forgotAuth(data: User): string {
    return `A verification code has been sent to ${data.USER_NAME}`;
  }
}
