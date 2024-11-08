import { Inject, Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/IReservation.repositories';
import { RESERVATION_SERVICE_TOKEN } from '../utils/reservationServiceToken';

@Injectable()
export class FindReservationByIdService {
  constructor(
    @Inject(RESERVATION_SERVICE_TOKEN)
    private readonly reservationRepositories: IReservationRepositories,
  ) { }

  async execute(id: number) {
    return await this.reservationRepositories.findReservationById(id);
  }
}
