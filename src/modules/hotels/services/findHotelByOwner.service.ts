import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import { HOTEL_SERVICE_TOKEN } from '../uitls/hotelServiceToken';

@Injectable()
export class FindHotelByOwnerService {
  constructor(
    @Inject(HOTEL_SERVICE_TOKEN)
    private readonly hotelRepositories: IHotelRepositories,
  ) { }

  async execute(ownerId: number) {
    const hotel = await this.hotelRepositories.findHotelByOwner(ownerId);
    return hotel;
  }
}
