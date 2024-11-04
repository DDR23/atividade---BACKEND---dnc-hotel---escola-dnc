import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const ROLES_KEY = 'roles';
/**
 * Custom decorator to set roles metadata for route handlers.
 *
 * @param {...Role[]} roles - One or more roles that are allowed to access the route.
 *
 * @returns {MethodDecorator} A method decorator that sets the roles metadata.
 */
export const Roles = (...roles: Role[]): MethodDecorator => SetMetadata(ROLES_KEY, roles);
