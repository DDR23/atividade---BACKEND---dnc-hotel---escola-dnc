import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/IReservation.repositories';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class UpdateReservationService {
  constructor(
    @Inject('RESERVATION_SERVICE_TOKEN')
    private readonly reservationRepositories: IReservationRepositories,
  ) { }

  async execute(id: number, status: ReservationStatus) {
    return await this.reservationRepositories.updateStatusReservation(id, status);
  }
}
