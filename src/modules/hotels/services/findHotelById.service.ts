import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class FindHotelByIdService {
  /**
   * Constructs a new instance of the FindHotelByIdService.
   *
   * @param hotelRepositories The service responsible for interacting with the database.
   */
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  /**
   * Finds a hotel by its ID.
   *
   * @param id The ID of the hotel to be found.
   *
   * @throws {NotFoundException} If the hotel is not found
   *
   * @returns The found hotel
   */
  async execute(id: number) {
    const hotel = await this.hotelRepositories.findHotelById(id);
    if (!hotel) throw new NotFoundException('Hotel not found');
    return hotel;
  }
}
