import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  // controllers: [], //nao utilizado aqui
  // providers: [], //nao utilizado aqui
  // exports: [], //nao utilizado aqui
})
export class AppModule {}
