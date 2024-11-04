import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UserIdCheckMiddleware } from "../../shared/middlewares/userIdCheck.middleware";
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        /**
         * Generates a unique filename for the uploaded file by appending a UUID to the original file name.
         *
         * @param _req - The request object (not used in this function)
         * @param file - The uploaded file object containing the original file name
         * @param cb - The callback function to return the generated filename
         */
        filename: (_req, file, cb) => {
          const filename = `${uuidv4()}${file.originalname}`;
          return cb(null, filename);
        }
      })
    })
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
