import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class FindHotelByOwnerService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  async execute(ownerId: number) {
    const hotel = await this.hotelRepositories.findHotelByOwner(ownerId);
    return hotel;
  }
}
