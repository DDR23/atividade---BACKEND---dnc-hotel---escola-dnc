import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class DeleteHotelService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  async execute(id: number) {
    return await this.hotelRepositories.deleteHotel(id);
  }
}
