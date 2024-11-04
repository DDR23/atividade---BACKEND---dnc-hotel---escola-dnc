import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

/**
 * Custom decorator to retrieve user information from the request.
 *
 * @param {string} [filter] - Optional filter to retrieve a specific property of the user.
 * 
 * @throws {NotFoundException} If the user is not found in the request or if the specified filter does not exist on the user object.
 *
 * @returns {any} The user object or a specific property of the user based on the provided filter.
 */
export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
  const user = context.switchToHttp().getRequest().user;
  if (!user) throw new NotFoundException('User not found');
  if (filter) {
    if (!user[filter]) throw new NotFoundException(`User ${filter} not found`);
    return user[filter];
  }
  return user;
});
