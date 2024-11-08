import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { HOTEL_REDIS_TOKEN } from '../uitls/hotelRedisToken';

@Injectable()
export class CreateHotelService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepositories,
    @InjectRedis()
    private readonly redis: Redis,
  ) { }

  async execute(id: number, createHotelDto: CreateHotelDto) {
    await this.redis.del(HOTEL_REDIS_TOKEN);
    return await this.hotelRepositories.createHotel(id, createHotelDto);
  }
}
