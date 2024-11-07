import { Module } from '@nestjs/common';
import { ReservationsController } from './infra/reservations.controller';
import { CreateReservationService } from './services/createReservation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { HotelsModule } from '../hotels/hotels.module';
import { ReservationRepository } from './infra/reservations.repository';
import { FindReservationsByUserService } from './services/findReservationsByUser.service';
import { FindReservationByIdService } from './services/findReservationById.service';
import { FindReservationsService } from './services/findReservations.service';
import { UpdateStatusReservationService } from './services/updateStatusReservation.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    HotelsModule,
  ],
  controllers: [
    ReservationsController,
  ],
  providers: [
    CreateReservationService,
    FindReservationsByUserService,
    FindReservationByIdService,
    FindReservationsService,
    UpdateStatusReservationService,
    {
      provide: 'RESERVATION_SERVICE_TOKEN',
      useClass: ReservationRepository,
    },
  ],
})
export class ReservationsModule { }
