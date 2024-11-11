import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { FindHotelByOwnerService } from "./findHotelByOwner.service";
import { HOTEL_SERVICE_TOKEN } from "../utils/hotelServiceToken";

let service: FindHotelByOwnerService;
let hotelRepositories: IHotelRepositories;

const findHotelByOwnerMock = {
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

describe('FindHotelByOwnerService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindHotelByOwnerService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            findHotelByOwner: jest.fn().mockResolvedValue(findHotelByOwnerMock),
          },
        },
      ],
    }).compile();
    service = module.get<FindHotelByOwnerService>(FindHotelByOwnerService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find a hotel by owner', async () => {
    const result = await service.execute(findHotelByOwnerMock.FK_HOTEL_OWNER_ID);
    expect(hotelRepositories.findHotelByOwner).toHaveBeenCalledWith(findHotelByOwnerMock.FK_HOTEL_OWNER_ID);
    expect(result).toEqual(findHotelByOwnerMock);
  });
});
