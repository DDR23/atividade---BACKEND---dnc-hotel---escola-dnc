import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class FindHotelByNameService {
  /**
   * Constructs a new instance of the FindHotelByNameService.
   *
   * @param hotelRepositories The service responsible for interacting with the database.
   */
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

/**
 * Finds a hotel by its name.
 *
 * @param name The name of the hotel to be found.
 *
 * @returns The found hotel or null if not found.
 */
  async execute(name: string) {
    const hotel = await this.hotelRepositories.findHotelByName(name);
    return hotel;
  }
}
