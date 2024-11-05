import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class DeleteHotelService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepositories,
  ) { }

  async execute(id: number) {
    return await this.hotelRepositories.deleteHotel(id);
  }
}
