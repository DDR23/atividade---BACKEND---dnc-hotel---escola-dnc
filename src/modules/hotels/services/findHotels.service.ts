import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Hotel } from '@prisma/client';
import { HOTEL_REDIS_TOKEN } from '../uitls/hotelRedisToken';
import { HOTEL_SERVICE_TOKEN } from '../uitls/hotelServiceToken';

@Injectable()
export class FindHotelsService {
  constructor(
    @Inject(HOTEL_SERVICE_TOKEN)
    private readonly hotelRepositories: IHotelRepositories,
    @InjectRedis()
    private readonly redis: Redis,
  ) { }

  async execute(page: number = 1, limit: number = 10) {
    const offSet = (page - 1) * limit;
    let data = JSON.parse(await this.redis.get(HOTEL_REDIS_TOKEN));
    if (!data) {
      data = await this.hotelRepositories.findHotels(offSet, limit);
      data = data.map((hotel: Hotel) => {
        if(hotel.HOTEL_IMAGE) {
          hotel.HOTEL_IMAGE = `${process.env.APP_API_URL}/uploads/hotels/${hotel.HOTEL_IMAGE}`;
        }
        return hotel;
      })
      await this.redis.set(HOTEL_REDIS_TOKEN, JSON.stringify(data));
    }
    const total = await this.hotelRepositories.countHotels();
    return {
      total,
      page,
      per_page: limit,
      data,
    }
  }
}
