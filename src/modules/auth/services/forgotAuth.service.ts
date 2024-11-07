import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthRepositories } from "../domain/repositories/IAuth.repositories";
import { ForgotAuthDto } from "../domain/dto/forgot-auth.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { templateHTML } from "../utils/templateHTML";
import { FindUserByEmailService } from "src/modules/users/services/finduserByEmail.service";

@Injectable()
export class ForgotAuthService {
  constructor(
    @Inject('AUTH_SERVICE_TOKEN')
    private readonly authRepositories: IAuthRepositories,
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly mailerService: MailerService,
  ) { }

  async execute(data: ForgotAuthDto): Promise<string> {
    const user = await this.findUserByEmailService.execute(data.email);
    if (!user) throw new UnauthorizedException('Email is incorrect');
    const token = await this.authRepositories.generateTokenAuth(user, '30m');
    await this.mailerService.sendMail({
      to: user.USER_EMAIL,
      subject: 'Password recodery - DNC Hotel',
      html: templateHTML(user.USER_NAME, token.access_token),
    });
    return await this.authRepositories.forgotAuth(user);
  }
}
