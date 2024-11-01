import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([
      { ttl: 5000, limit: 5 },
    ])],
  // controllers: [], //nao utilizado aqui
  providers: [
    { provide: 'APP_GUARD', useClass: ThrottlerGuard },
  ],
  // exports: [], //nao utilizado aqui
})
export class AppModule { }
