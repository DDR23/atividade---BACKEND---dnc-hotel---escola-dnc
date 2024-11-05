import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ParamId } from "../../shared/decorators/paramId.decorator";
import { UserCreateDTO } from "./domain/dto/userCreate.dto";
import { UserUpdateDTO } from "./domain/dto/userUpdate.dto";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { RoleGuard } from "src/shared/guards/role.guard";
import { UserMatchGuard } from "src/shared/guards/userMatch.guard";
import { ThrottlerGuard } from "@nestjs/throttler";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/shared/decorators/user.decorator";
import { FileValidationInterceptor } from "src/shared/interceptors/fileValidation.interceptor";

@Controller('users')
@UseGuards(AuthGuard, RoleGuard, ThrottlerGuard)
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  // @SkipThrottle() // REMOVE O RATE LIMIT DE UMA ROTA
  // @Throttle({ default: { ttl: 50000, limit: 50 } }) // AUMENTA O RATE LIMIT DE UMA ROTA
  @Get()
  list() {
    return this.userService.list();
  }

  @Get(':id')
  show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Post('create')
  @Roles(Role.ADMIN)
  create(@Body() body: UserCreateDTO) {
    return this.userService.create(body);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('USER_AVATAR'), FileValidationInterceptor)
  uploadAvatar(
    @User('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 50 * 1024 })
        ],
      }),
    ) avatar: Express.Multer.File
  ) {
    return this.userService.uploadAvatar(id, avatar.filename);
  }

  @Patch('update/:id')
  @UseGuards(UserMatchGuard)
  update(@ParamId() id: number, @Body() body: UserUpdateDTO) {
    return this.userService.update(id, body)
  }

  @Delete('delete/:id')
  @UseGuards(UserMatchGuard)
  delete(@ParamId() id: number) {
    return this.userService.delete(id)
  }
}
