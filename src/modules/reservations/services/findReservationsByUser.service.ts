import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/IReservation.repositories';
import { RESERVATION_SERVICE_TOKEN } from '../utils/reservationServiceToken';

@Injectable()
export class FindReservationsByUserService {
  constructor(
    @Inject(RESERVATION_SERVICE_TOKEN)
    private readonly reservationRepositories: IReservationRepositories,
  ) { }

  async execute(id: number) {
    return await this.reservationRepositories.findReservationsByUser(id);
  }
}
