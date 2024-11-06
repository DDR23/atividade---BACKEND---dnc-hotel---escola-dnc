import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
