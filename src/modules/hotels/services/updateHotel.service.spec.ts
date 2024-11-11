import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { UpdateHotelService } from "./updateHotel.service";
import { HOTEL_SERVICE_TOKEN } from "../utils/hotelServiceToken";
import { HOTEL_REDIS_TOKEN } from "../utils/hotelRedisToken";

const uploadHotelMock = {
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

describe('UpdateHotelService', () => {
  let service: UpdateHotelService;
  let hotelRepositories: IHotelRepositories;
  let redis: { del: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateHotelService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            updateHotel: jest.fn().mockResolvedValue(uploadHotelMock),
          },
        },
        {
          provide: 'default_IORedisModuleConnectionToken',
          useValue: {
            del: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();
    service = module.get<UpdateHotelService>(UpdateHotelService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
    redis = module.get('default_IORedisModuleConnectionToken');
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should delete the redis key', async () => {
    await service.execute(uploadHotelMock.id, { HOTEL_NAME: 'new name' });
    expect(redis.del).toHaveBeenCalledWith(HOTEL_REDIS_TOKEN);
  });

  it('Should update hotel', async () => {
    await service.execute(uploadHotelMock.id, { HOTEL_NAME: 'new name' });
    expect(hotelRepositories.updateHotel).toHaveBeenCalledWith(uploadHotelMock.id, { HOTEL_NAME: 'new name' });
  });
});
