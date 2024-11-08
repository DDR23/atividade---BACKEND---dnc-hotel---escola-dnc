import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { FindHotelsService } from "./findHotels.service";
import { Hotel } from "@prisma/client";
import { HOTEL_REDIS_TOKEN } from "../uitls/hotelRedisToken";
import { HOTEL_SERVICE_TOKEN } from "../uitls/hotelServiceToken";

let service: FindHotelsService;
let hotelRepositories: IHotelRepositories;
let redis: {
  get: jest.Mock,
  set: jest.Mock,
};

const findHotelsMock: Hotel = {
  id: 1,
  HOTEL_NAME: 'teste hotel',
  HOTEL_DESCRIPTION: 'desc...',
  HOTEL_ADDRESS: 'Rua 1',
  HOTEL_IMAGE: 'teste.png',
  HOTEL_PRICE: 100,
  FK_HOTEL_OWNER_ID: 1,
  createdAt: new Date('2024-07-28T10:41:18.753Z'),
  updatedAt: new Date('2024-07-28T10:41:18.753Z'),
};

describe('FindHotelsService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindHotelsService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            findHotels: jest.fn().mockResolvedValue([findHotelsMock]),
            countHotels: jest.fn().mockResolvedValue(1),
          },
        },
        {
          provide: 'default_IORedisModuleConnectionToken',
          useValue: {
            get: jest.fn().mockResolvedValue(JSON.stringify([findHotelsMock])),
            set: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<FindHotelsService>(FindHotelsService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
    redis = module.get('default_IORedisModuleConnectionToken');
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return hotels from redis is available', async () => {
    const result = await service.execute();
    result.data.forEach((hotel: Hotel) => {
      hotel.createdAt = new Date(hotel.createdAt);
      hotel.updatedAt = new Date(hotel.updatedAt);
    });
    expect(redis.get).toHaveBeenCalledWith(HOTEL_REDIS_TOKEN);
    expect(result.data).toEqual([findHotelsMock]);
  });

  it('Should fetch hotels from repositories if not in redis and cache them', async () => {
    redis.get.mockResolvedValue(null);
    const result = await service.execute();
    expect(redis.get).toHaveBeenCalledWith(HOTEL_REDIS_TOKEN);
    expect(hotelRepositories.findHotels).toHaveBeenCalledWith(0, 10);
    expect(redis.set).toHaveBeenCalledWith(HOTEL_REDIS_TOKEN, JSON.stringify([findHotelsMock]));
    expect(hotelRepositories.countHotels).toHaveBeenCalledWith();
    expect(result.data).toEqual([findHotelsMock]);
    expect(result.total).toEqual(1);
  });

  it('Should return the correct pagination metadata', async () => {
    redis.get.mockResolvedValue(null);
    const page = 2;
    const limit = 5;
    const result = await service.execute(page, limit);
    expect(hotelRepositories.findHotels).toHaveBeenCalledWith(5, 5);
    expect(result.page).toEqual(page);
    expect(result.per_page).toEqual(limit);
  })

  it('Should format hotel images URLs correctly', async () => {
    redis.get.mockResolvedValue(null);
    (hotelRepositories.findHotels as jest.Mock).mockResolvedValue([{ ...findHotelsMock, HOTEL_IMAGE: 'teste.png' }])
    const result = await service.execute();
    expect(result.data[0].HOTEL_IMAGE).toEqual(`${process.env.APP_API_URL}/uploads/hotels/teste.png`);
  })
});
