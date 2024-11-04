import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Custom decorator to extract the 'id' parameter from the request.
 *
 * @returns {number} The 'id' parameter converted to a number.
 *
 * @throws {TypeError} If the 'id' parameter is not a valid number.
 */
export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const id = request.params.id;
  return Number(id);
});
