import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/hotelUpdate.dto';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class UpdateHotelService {
  /**
   * Constructs a new instance of the UpdateHotelService.
   *
   * @param hotelRepositories The service responsible for interacting with the database.
   */
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  /**
   * Updates a hotel with the given data.
   *
   * @param id The ID of the hotel to be updated
   * @param updateHotelDto The data to update the hotel with
   *
   * @returns The updated hotel
   */
  async execute(id: number, updateHotelDto: UpdateHotelDto) {
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
