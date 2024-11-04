import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
  /**
   * Intercept a request and log it's url and time after completion
   * @param context The execution context
   * @param next The call handler
   */
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log(`Url: ${request.url}`);
        console.log(`After: ${Date.now() - now}ms`);
      })
    );
  }
}
