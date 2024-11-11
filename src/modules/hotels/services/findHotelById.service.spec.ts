import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { FindHotelByIdService } from "./findHotelById.service";
import { HOTEL_SERVICE_TOKEN } from "../utils/hotelServiceToken";
import { NotFoundException } from "@nestjs/common";

let service: FindHotelByIdService;
let hotelRepositories: IHotelRepositories;

const findHotelByIdMock = {
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

describe('FindHotelByIdService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindHotelByIdService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            findHotelById: jest.fn().mockResolvedValue(findHotelByIdMock),
          },
        },
      ],
    }).compile();
    service = module.get<FindHotelByIdService>(FindHotelByIdService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should find a hotel by Id', async () => {
    const result = await service.execute(findHotelByIdMock.id);
    expect(hotelRepositories.findHotelById).toHaveBeenLastCalledWith(findHotelByIdMock.id);
    expect(result).toEqual(findHotelByIdMock);
  });

  it('Should throw NotFoundException if hotel does not find', async () => {
    (hotelRepositories.findHotelById as jest.Mock).mockResolvedValue(null);
    await expect(service.execute(1)).rejects.toThrow(NotFoundException);
  });
});
