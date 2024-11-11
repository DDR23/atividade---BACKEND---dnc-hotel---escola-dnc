import { Test, TestingModule } from "@nestjs/testing";
import { CreateHotelService } from "./createHotel.service";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { HOTEL_REDIS_TOKEN } from "../utils/hotelRedisToken";
import { HOTEL_SERVICE_TOKEN } from "../utils/hotelServiceToken";

const userIdMock = 1;
const createHotelMock = {
  id: 1,
  HOTEL_NAME: 'teste hotel',
  HOTEL_DESCRIPTION: 'desc...',
  HOTEL_ADDRESS: 'Rua 1',
  HOTEL_IMAGE: 'teste.png',
  HOTEL_PRICE: 100,
  FK_HOTEL_OWNER_ID: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CreateHotelService', () => {
  let service: CreateHotelService;
  let hotelRepositories: IHotelRepositories;
  let redis: { del: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHotelService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            createHotel: jest.fn().mockResolvedValue(createHotelMock),
          },
        },
        {
          provide: 'default_IORedisModuleConnectionToken',
          useValue: {
            del: jest.fn().mockResolvedValue(1),
          },
        },
      ]
    }).compile();
    service = module.get<CreateHotelService>(CreateHotelService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
    redis = module.get('default_IORedisModuleConnectionToken');
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete the redis key', async () => {
    await service.execute(userIdMock, createHotelMock);
    expect(redis.del).toHaveBeenCalledWith(HOTEL_REDIS_TOKEN);
  });

  it('should create a hotel', async () => {
    const result = await service.execute(userIdMock, createHotelMock);
    expect(hotelRepositories.createHotel).toHaveBeenCalledWith(userIdMock, createHotelMock);
    expect(result).toEqual(createHotelMock);
  });
});
