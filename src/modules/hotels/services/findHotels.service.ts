import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class FindHotelsService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepositories,
    @InjectRedis()
    private readonly redis: Redis,
  ) { }

  async execute(page: number = 1, limit: number = 10) {
    const offSet = (page - 1) * limit;
    let data = JSON.parse(await this.redis.get('REDIS_HOTEL_KEY'));
    if (!data) {
      data = await this.hotelRepositories.findHotels(offSet, limit);
      await this.redis.set('REDIS_HOTEL_KEY', JSON.stringify(data));
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
