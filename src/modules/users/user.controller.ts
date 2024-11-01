import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
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

@UseGuards(AuthGuard, RoleGuard, ThrottlerGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

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

  @Roles(Role.ADMIN)
  @Post('create')
  create(@Body() body: UserCreateDTO) {
    return this.userService.create(body);
  }

  @UseGuards(UserMatchGuard)
  @Patch('update/:id')
  update(@ParamId() id: number, @Body() body: UserUpdateDTO) {
    return this.userService.update(id, body)
  }

  @UseGuards(UserMatchGuard)
  @Delete('delete/:id')
  delete(@ParamId() id: number) {
    return this.userService.delete(id)
  }
}
