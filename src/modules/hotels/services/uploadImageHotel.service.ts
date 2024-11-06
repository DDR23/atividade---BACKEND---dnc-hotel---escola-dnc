import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import { join, resolve } from 'path';
import { stat, unlink } from 'fs/promises';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class UploadImageHotelService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepositories,
    @InjectRedis()
    private readonly redis: Redis,
  ) { }

  async execute(id: string, imageFileName: string) {
    const hotel = await this.hotelRepositories.findHotelById(Number(id));
    const directory = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'hotels');
    if (!hotel) throw new NotFoundException('Hotel not found');
    if (hotel.HOTEL_IMAGE) {
      const hotelImageFilePath = join(directory, hotel.HOTEL_IMAGE);
      const hotelImageFileExists = await stat(hotelImageFilePath);
      if (hotelImageFileExists) await unlink(hotelImageFilePath);
    }
    await this.redis.del('REDIS_HOTEL_KEY');
    const hotelUpdated = await this.hotelRepositories.uploadImageHotel(Number(id), { HOTEL_IMAGE: imageFileName });
    return hotelUpdated;
  }
}
