import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/IReservation.repositories';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class UpdateStatusReservationService {
  constructor(
    @Inject('RESERVATION_SERVICE_TOKEN')
    private readonly reservationRepositories: IReservationRepositories,
  ) { }

  async execute(id: number, status: ReservationStatus) {
    if (!(status in ReservationStatus)) throw new BadRequestException('Invalid reservations status');
    return await this.reservationRepositories.updateStatusReservation(id, status);
  }
}
