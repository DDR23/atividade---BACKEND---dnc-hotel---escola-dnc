import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  USER_NAME: string;

  @IsEmail()
  @IsNotEmpty()
  USER_EMAIL: string;

  @IsString()
  @IsNotEmpty()
  USER_PASSWORD: string;

  @IsString()
  @IsEnum(Role)
  USER_ROLE: Role;

  @IsOptional()
  USER_AVATAR?: string;
}
