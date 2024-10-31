import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  // controllers: [], //nao utilizado aqui
  // providers: [], //nao utilizado aqui
})
export class AppModule {}
