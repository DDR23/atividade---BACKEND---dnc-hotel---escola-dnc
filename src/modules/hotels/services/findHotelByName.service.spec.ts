import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { FindHotelByNameService } from "./findHotelByName.service";
import { HOTEL_SERVICE_TOKEN } from "../utils/hotelServiceToken";

const findHotelByNameMock = {
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

describe('FindHotelByNameService', () => {
  let service: FindHotelByNameService;
  let hotelRepositories: IHotelRepositories;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindHotelByNameService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            findHotelByName: jest.fn().mockResolvedValue(findHotelByNameMock),
          },
        },
      ],
    }).compile();
    service = module.get<FindHotelByNameService>(FindHotelByNameService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find a hotel by name', async () => {
    const result = await service.execute(findHotelByNameMock.HOTEL_NAME);
    expect(hotelRepositories.findHotelByName).toHaveBeenCalledWith(findHotelByNameMock.HOTEL_NAME);
    expect(result).toEqual(findHotelByNameMock);
  });
});
