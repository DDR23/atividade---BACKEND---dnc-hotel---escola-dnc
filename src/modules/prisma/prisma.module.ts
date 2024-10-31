import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
  // imports: [], //nao utilizado aqui
  providers: [PrismaService],
  // controllers: [], //nao utilizado aqui
  exports: [PrismaService],
})
export class PrismaModule {}
