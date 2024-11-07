import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UserIdCheckMiddleware } from "../../shared/middlewares/userIdCheck.middleware";
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';
import { UserController } from "./infra/users.controller";
import { CreateUserService } from "./services/createUser.service";
import { FindUserByEmailService } from "./services/finduserByEmail.service";
import { FindUserByIdService } from "./services/findUserById.service";
import { FindUsersService } from "./services/findUsers.service";
import { UpdateUserService } from "./services/updateUser.service";
import { UploadImageUserService } from "./services/uploadImageUser.service";
import { DeleteUserService } from "./services/deleteUser.service";
import { UserRepository } from "./infra/users.repository";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/users',
        filename: (_req, file, cb) => {
          const filename = `${uuidv4()}${file.originalname}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    CreateUserService,
    FindUserByEmailService,
    FindUserByIdService,
    FindUsersService,
    UpdateUserService,
    UploadImageUserService,
    DeleteUserService,
    {
      provide: 'USER_SERVICE_TOKEN',
      useClass: UserRepository,
    },
  ],
  exports: [
    CreateUserService,
    FindUserByEmailService,
    FindUserByIdService,
    UpdateUserService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes(
      { path: 'users/:id', method: RequestMethod.GET },
      { path: 'users/update/:id', method: RequestMethod.PATCH },
      { path: 'users/delete/:id', method: RequestMethod.DELETE }
    );
    // more consumers...
  }
}
