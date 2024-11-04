import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { UserService } from "src/modules/users/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
/**
 * Constructs an instance of AuthGuard.
 * 
 * @param authService - The AuthService used to validate JWT tokens.
 * @param userService - The UserService used to retrieve user information.
 */
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  /**
   * Checks if the Authorization Bearer token is valid and the user exists.
   * 
   * @param context - The ExecutionContext containing the request
   * @returns A boolean indicating whether the operation is allowed
   */
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedException('Invalid Token');
    const token = authorization.split(' ')[1];

    const { valid, decoded } = await this.authService.validateToken(token);
    if (!valid) throw new UnauthorizedException('Invalid Token');

    const user = await this.userService.show(Number(decoded.sub));
    if (!user) return false;
    request.user = user;

    return true;
  }
}
