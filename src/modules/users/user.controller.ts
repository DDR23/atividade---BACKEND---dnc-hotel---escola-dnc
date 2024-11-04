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
  /**
   * Get all users.
   *
   * @returns {Promise<User[]>}
   */
  list() {
    return this.userService.list();
  }

  @Get(':id')
  /**
   * Get a user by their ID.
   *
   * @param id The user's ID
   *
   * @throws {NotFoundException} If the user is not found
   *
   * @returns The user
   */
  show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Roles(Role.ADMIN)
  @Post('create')
  /**
   * Create a new user.
   *
   * @param body The user's information
   *
   * @throws {BadRequestException} If the user already exists
   *
   * @returns The created user
   */
  create(@Body() body: UserCreateDTO) {
    return this.userService.create(body);
  }

  @UseGuards(UserMatchGuard)
  @Patch('update/:id')
  /**
   * Update a user.
   *
   * @param id The user's ID
   * @param body The user's new information
   *
   * @throws {NotFoundException} If the user is not found
   *
   * @returns The updated user
   */
  update(@ParamId() id: number, @Body() body: UserUpdateDTO) {
    return this.userService.update(id, body)
  }

  @UseGuards(UserMatchGuard)
  @Delete('delete/:id')
  /**
   * Delete a user by their ID.
   *
   * @param id The user's ID
   *
   * @throws {NotFoundException} If the user is not found
   *
   * @returns The deleted user
   */
  delete(@ParamId() id: number) {
    return this.userService.delete(id)
  }
}
