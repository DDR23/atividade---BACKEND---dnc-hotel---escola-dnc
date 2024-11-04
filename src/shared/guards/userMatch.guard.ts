import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class UserMatchGuard implements CanActivate {
  /**
   * Checks if the user is allowed to perform the operation, given the user id
   * provided in the request parameters. If the user id does not match the id
   * in the request, throws an UnauthorizedException.
   *
   * @param context - The execution context
   * @returns A boolean indicating whether the operation is allowed
   */
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    const user = request.user;
    if (user.id !== Number(id)) throw new UnauthorizedException('You are not allowed to perform this operation');
    return true;
  }
}
