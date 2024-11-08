import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { HOTEL_REDIS_TOKEN } from '../uitls/hotelRedisToken';
import { HOTEL_SERVICE_TOKEN } from '../uitls/hotelServiceToken';

@Injectable()
export class DeleteHotelService {
  constructor(
    @Inject(HOTEL_SERVICE_TOKEN)
    private readonly hotelRepositories: IHotelRepositories,
    @InjectRedis()
    private readonly redis: Redis,
  ) { }

  async execute(id: number) {
    await this.redis.del(HOTEL_REDIS_TOKEN);
    return await this.hotelRepositories.deleteHotel(id);
  }
}
