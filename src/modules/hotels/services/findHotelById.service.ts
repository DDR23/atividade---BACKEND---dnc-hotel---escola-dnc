import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class FindHotelByIdService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  async execute(id: number) {
    const hotel = await this.hotelRepositories.findHotelById(id);
    if (!hotel) throw new NotFoundException('Hotel not found');
    return hotel;
  }
}
