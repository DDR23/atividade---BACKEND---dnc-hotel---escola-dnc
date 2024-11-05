import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([{ ttl: 5000, limit: 5 }]),
    MailerModule.forRoot({
      transport: process.env.SMTP,
      defaults: { from: `"dnc_hotel" <${process.env.EMAIL_USER}>` },
    }),
    HotelsModule,
    ReservationsModule,
  ],
  // controllers: [], //nao utilizado aqui
  providers: [{ provide: 'APP_GUARD', useClass: ThrottlerGuard }],
  // exports: [], //nao utilizado aqui
})
export class AppModule { }
