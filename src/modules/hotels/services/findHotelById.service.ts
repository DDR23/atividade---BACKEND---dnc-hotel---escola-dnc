import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class FindHotelByIdService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepositories,
  ) { }

  async execute(id: number) {
    const hotel = await this.hotelRepositories.findHotelById(id);
    if (!hotel) throw new NotFoundException('Hotel not found');
    return hotel;
  }
}
