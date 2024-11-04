import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UserIdCheckMiddleware } from "../../shared/middlewares/userIdCheck.middleware";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  /**
   * Configures the middleware consumer to apply the UserIdCheckMiddleware
   * to all routes that contain a user ID in the path.
   *
   * @param consumer the middleware consumer
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes(
      { path: 'users/:id', method: RequestMethod.GET },
      { path: 'users/update/:id', method: RequestMethod.PATCH },
      { path: 'users/delete/:id', method: RequestMethod.DELETE }
    );
    // more consumers...
  }
}
