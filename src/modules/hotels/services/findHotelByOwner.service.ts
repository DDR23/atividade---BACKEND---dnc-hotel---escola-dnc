import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import { HOTEL_SERVICE_TOKEN } from '../utils/hotelServiceToken';

@Injectable()
export class FindHotelByOwnerService {
  constructor(
    @Inject(HOTEL_SERVICE_TOKEN)
    private readonly hotelRepositories: IHotelRepositories,
  ) { }

  async execute(ownerId: number) {
    return await this.hotelRepositories.findHotelByOwner(ownerId);
  }
}
