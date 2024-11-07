import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { FindUserByIdService } from "src/modules/users/services/findUserById.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly findUserByIdService: FindUserByIdService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedException('Invalid Token');
    const token = authorization.split(' ')[1];
    const { valid, decoded } = await this.authService.validateToken(token);
    if (!valid) throw new UnauthorizedException('Invalid Token');
    const user = await this.findUserByIdService.execute(Number(decoded.sub));
    if (!user) return false;
    request.user = user;
    return true;
  }
}
