import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/IReservation.repositories';
import { RESERVATION_SERVICE_TOKEN } from '../utils/reservationServiceToken';

@Injectable()
export class FindReservationsService {
  constructor(
    @Inject(RESERVATION_SERVICE_TOKEN)
    private readonly reservationRepositories: IReservationRepositories,
  ) { }

  async execute() {
    return await this.reservationRepositories.findReservations();
  }
}
