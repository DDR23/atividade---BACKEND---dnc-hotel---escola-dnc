import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    HotelsModule,
    ReservationsModule,
    ThrottlerModule.forRoot([{
      ttl: 5000,
      limit: 5,
    }]),
    MailerModule.forRoot({
      transport: process.env.SMTP,
      defaults: { from: `"dnc_hotel" <${process.env.EMAIL_USER}>` },
    }),
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
  ],
  // controllers: [], //nao utilizado aqui
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
  // exports: [], //nao utilizado aqui
})
export class AppModule { }
