import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { UploadImageHotelService } from "./uploadImageHotel.service";
import { HOTEL_SERVICE_TOKEN } from "../utils/hotelServiceToken";
import { NotFoundException } from "@nestjs/common";
import { join, resolve } from "path";
import { stat, unlink } from "fs/promises";
import { HOTEL_REDIS_TOKEN } from "../utils/hotelRedisToken";

let service: UploadImageHotelService;
let hotelRepositories: IHotelRepositories;
let redis: { del: jest.Mock };

const uploadImageHotelMock = {
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

jest.mock('fs/promises', () => ({
  stat: jest.fn(),
  unlink: jest.fn()
}))

describe('UploadImageHotelService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadImageHotelService,
        {
          provide: HOTEL_SERVICE_TOKEN,
          useValue: {
            findHotelById: jest.fn().mockResolvedValue(uploadImageHotelMock),
            uploadImageHotel: jest.fn().mockResolvedValue(uploadImageHotelMock),
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
    service = module.get<UploadImageHotelService>(UploadImageHotelService);
    hotelRepositories = module.get<IHotelRepositories>(HOTEL_SERVICE_TOKEN);
    redis = module.get('default_IORedisModuleConnectionToken');
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should throw NotFoundException if hotel does not exist', async () => {
    (hotelRepositories.findHotelById as jest.Mock).mockResolvedValue(null);
    await expect(service.execute('1', 'teste.png')).rejects.toThrow(NotFoundException);
  });

  it('Should delete existing image if it exists', async () => {
    (stat as jest.Mock).mockResolvedValue(true);
    await service.execute('1', 'teste.png');
    const directory = resolve(__dirname, '..', '..', '..', '..', 'uploads', 'hotels');
    const hotelImageFilePath = join(directory, uploadImageHotelMock.HOTEL_IMAGE);
    expect(stat).toHaveBeenCalledWith(hotelImageFilePath)
    expect(unlink).toHaveBeenCalledWith(hotelImageFilePath)
  });

  it('Should not throw if existing image does not exists', async () => {
    (stat as jest.Mock).mockResolvedValue(null);
    await expect(service.execute('1', 'new-image.png')).resolves.not.toThrow();
  });

  it('Should update the hotel with the new image', async () => {
    (stat as jest.Mock).mockResolvedValue(true);
    await service.execute('1', 'new-image.png');
    expect(hotelRepositories.uploadImageHotel).toHaveBeenCalledWith(1, { HOTEL_IMAGE: 'new-image.png' });
  });

  it('Should delete the Redis cache key', async () => {
    await service.execute('1', 'new-image.png');
    expect(redis.del).toHaveBeenCalledWith(HOTEL_REDIS_TOKEN);
  });
});
