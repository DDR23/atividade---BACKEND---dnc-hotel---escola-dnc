import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

interface JwtPayload {
  name: string;
  iat?: number;
  expiresIn?: number;
  issuer?: string;
  sub: string;
  audience?: string;
}

export class AuthValidateTokenDTO {
  @IsBoolean()
  @IsNotEmpty()
  valid: boolean;

  decoded?: JwtPayload;
}
