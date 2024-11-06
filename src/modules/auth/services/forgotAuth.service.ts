import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ForgotAuthDto } from "../domain/dto/forgot-auth.dto";
import { IJwtAuthRepositories } from "../domain/repositories/IJwtAuth.repositories";
import { IUserRepositories } from "src/modules/users/domain/repositories/IUser.repositories";
import { MailerService } from "@nestjs-modules/mailer";
import { templateHTML } from "../utils/templateHTML";
import { IAuthRepositories } from "../domain/repositories/IAuth.reposirories";

@Injectable()
export class ForgotAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly jwtAuthRepositories: IJwtAuthRepositories,
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly AuthRepositories: IAuthRepositories,
    @Inject('USER_SERVICE_TOKEN')
    private readonly userRepositories: IUserRepositories,
    private readonly mailerService: MailerService,
  ) { }

  async execute(data: ForgotAuthDto): Promise<string> {
    const user = await this.userRepositories.findUserByEmail(data.email);
    if (!user) throw new UnauthorizedException('Email is incorrect');
    const token = await this.jwtAuthRepositories.signTokenAuth(user, '30m');
    await this.mailerService.sendMail({
      to: user.USER_EMAIL,
      subject: 'Password recodery - DNC Hotel',
      html: templateHTML(user.USER_NAME, token.access_token),
    });
    return this.AuthRepositories.forgotAuth(user);
  }
}
