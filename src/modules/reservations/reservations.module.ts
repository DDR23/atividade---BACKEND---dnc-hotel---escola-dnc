import { Module } from '@nestjs/common';
import { ReservationsController } from './infra/reservations.controller';
import { ReservationsService } from './services/reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
