import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { RoleGuard } from "src/shared/guards/role.guard";
import { UserMatchGuard } from "src/shared/guards/userMatch.guard";
import { ThrottlerGuard } from "@nestjs/throttler";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/shared/decorators/user.decorator";
import { FileValidationInterceptor } from "src/shared/interceptors/fileValidation.interceptor";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { CreateUserDto } from "../domain/dto/create-user.dto";
import { CreateUserService } from "../services/createUser.service";
import { FindUserByEmailService } from "../services/finduserByEmail.service";
import { FindUserByIdService } from "../services/findUserById.service";
import { ParamId } from "src/shared/decorators/paramId.decorator";
import { FindUsersService } from "../services/findUsers.service";
import { UpdateUserDto } from "../domain/dto/update-user.dto";
import { UpdateUserService } from "../services/updateUser.service";
import { UploadImageUserService } from "../services/uploadImageUser.service";
import { DeleteUserService } from "../services/deleteUser.service";

@Controller('users')
@UseGuards(AuthGuard, RoleGuard, ThrottlerGuard)
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findUsersService: FindUsersService,
    private readonly updateUserService: UpdateUserService,
    private readonly uploadImageUserService: UploadImageUserService,
    private readonly deleteUserService: DeleteUserService,
  ) { }

  // @SkipThrottle() // REMOVE O RATE LIMIT DE UMA ROTA
  // @Throttle({ default: { ttl: 50000, limit: 50 } }) // AUMENTA O RATE LIMIT DE UMA ROTA
  @Post('create')
  @Roles(Role.ADMIN)
  createUser(
    @Body() data: CreateUserDto,
  ) {
    return this.createUserService.execute(data);
  }

  @Get('email')
  findUserByEmail(
    @Body() email: string,
  ) {
    return this.findUserByEmailService.execute(email);
  }

  @Get(':id')
  show(
    @ParamId() id: number,
  ) {
    return this.findUserByIdService.execute(id);
  }

  @Get()
  list() {
    return this.findUsersService.execute();
  }

  @Patch('update/:id')
  @UseGuards(UserMatchGuard)
  update(
    @ParamId() id: number,
    @Body() data: UpdateUserDto,
  ) {
    return this.updateUserService.execute(id, data)
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('USER_AVATAR'), FileValidationInterceptor)
  uploadImageUser(
    @User('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 50 * 1024 })
        ],
      }),
    ) data: Express.Multer.File,
  ) {
    return this.uploadImageUserService.execute(id, data.filename);
  }

  @Delete('delete/:id')
  @UseGuards(UserMatchGuard)
  delete(
    @ParamId() id: number,
  ) {
    return this.deleteUserService.execute(id)
  }
}
