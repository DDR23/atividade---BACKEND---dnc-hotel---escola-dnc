import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  // controllers: [], //nao utilizado aqui
  // providers: [], //nao utilizado aqui
})
export class AppModule {}
