import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { DeleteHotelService } from "./deleteHotel.service";
import { HOTEL_SERVICE_TOKEN } from "../utils/hotelServiceToken";
import { HOTEL_REDIS_TOKEN } from "../utils/hotelRedisToken";

const deleteHotelMock = {
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

describe('DeleteHotelService', () => {
  let service: DeleteHotelService;
  let hotelRepositories: IHotelRepositories;
  let redis: { del: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteHotelService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            deleteHotel: jest.fn().mockResolvedValue(deleteHotelMock),
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
    service = module.get<DeleteHotelService>(DeleteHotelService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
    redis = module.get('default_IORedisModuleConnectionToken');
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should delete the redis key', async () => {
    await service.execute(deleteHotelMock.id);
    expect(redis.del).toHaveBeenCalledWith(HOTEL_REDIS_TOKEN);
  });

  it('Should delete a hotel', async () => {
    const result = await service.execute(deleteHotelMock.id);
    expect(hotelRepositories.deleteHotel).toHaveBeenLastCalledWith(deleteHotelMock.id);
    expect(result).toEqual(deleteHotelMock);
  });
});
