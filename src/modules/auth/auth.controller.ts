import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./domain/dto/authLogin.dto";

// TODO - continuar daqui, tentar login

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body);
  }
}
