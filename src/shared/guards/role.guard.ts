import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  /**
   * Determines whether the current user has the required roles to access a route.
   *
   * @param context - The execution context containing request details.
   * @returns A boolean indicating if the user can activate the route.
   *          Returns true if no roles are required or if the user's role matches one of the required roles.
   *          Returns false if the user is not authenticated or does not have the required role.
   */
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;
    return requiredRoles.some((role) => user.USER_ROLE === role);;
  }
}
