import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('create')
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Get()
  list() {
    return this.userService.list();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.userService.show(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(id, body)
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
