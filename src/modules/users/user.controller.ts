import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ParamId } from "../../shared/decorators/paramId.decorator";
import { UserCreateDTO } from "./domain/dto/userCreate.dto";
import { UserUpdateDTO } from "./domain/dto/userUpdate.dto";
import { AuthGuard } from "../../shared/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  list() {
    return this.userService.list();
  }

  @Get(':id')
  show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Post('create')
  create(@Body() body: UserCreateDTO) {
    return this.userService.create(body);
  }

  @Patch('update/:id')
  update(@ParamId() id: number, @Body() body: UserUpdateDTO) {
    return this.userService.update(id, body)
  }

  @Delete('delete/:id')
  delete(@ParamId() id: number) {
    return this.userService.delete(id)
  }
}
