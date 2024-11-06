import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  USER_EMAIL: string;

  @IsString()
  @IsNotEmpty()
  USER_PASSWORD: string;
}
