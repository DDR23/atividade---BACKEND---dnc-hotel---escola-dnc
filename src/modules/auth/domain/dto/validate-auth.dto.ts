import { IsBoolean, IsNotEmpty } from "class-validator";

export interface JwtPayload {
  sub: string | number;
  name: string;
  iat?: number;
  expiresIn?: number;
  issuer?: string;
  audience?: string;
}

export class ValidateAuthDto {
  @IsBoolean()
  @IsNotEmpty()
  valid: boolean;

  decoded?: JwtPayload;
}
