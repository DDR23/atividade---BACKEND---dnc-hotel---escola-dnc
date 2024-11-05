import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/IReservation.repositories';

@Injectable()
export class FindReservationsService {
  constructor(
    @Inject('RESERVATION_SERVICE_TOKEN')
    private readonly reservationRepositories: IReservationRepositories,
  ) { }

  async execute() {
    return await this.reservationRepositories.findReservations();
  }
}
