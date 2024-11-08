import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { HOTEL_REDIS_TOKEN } from '../utils/hotelRedisToken';
import { HOTEL_SERVICE_TOKEN } from '../utils/hotelServiceToken';

@Injectable()
export class UpdateHotelService {
  constructor(
    @Inject(HOTEL_SERVICE_TOKEN)
    private readonly hotelRepositories: IHotelRepositories,
    @InjectRedis()
    private readonly redis: Redis,
  ) { }

  async execute(id: number, updateHotelDto: UpdateHotelDto) {
    await this.redis.del(HOTEL_REDIS_TOKEN);
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
