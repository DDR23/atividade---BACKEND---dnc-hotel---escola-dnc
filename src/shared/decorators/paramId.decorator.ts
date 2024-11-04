import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const id = request.params.id;
  return Number(id);
});
