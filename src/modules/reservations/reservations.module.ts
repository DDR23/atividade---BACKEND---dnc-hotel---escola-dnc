import { Module } from '@nestjs/common';
import { ReservationsController } from './infra/reservations.controller';
import { CreateReservationService } from './services/createReservation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { HotelsModule } from '../hotels/hotels.module';
import { ReservationRepository } from './infra/reservations.repository';
import { HotelsRepository } from '../hotels/infra/hotels.repository';
import { FindReservationsByUserService } from './services/findReservationsByUser.service';
import { FindReservationsByIdService } from './services/findReservationsById.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    HotelsModule,
  ],
  controllers: [ReservationsController],
  providers: [
    CreateReservationService,
    FindReservationsByUserService,
    FindReservationsByIdService,
    {
      provide: 'RESERVATION_SERVICE_TOKEN',
      useClass: ReservationRepository,
    },
    {
      provide: 'REPOSITORY_TOKEN_HOTEL',
      useClass: HotelsRepository,
    },
  ],
})
export class ReservationsModule { }
