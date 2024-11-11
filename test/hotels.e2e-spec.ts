import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Role } from '@prisma/client';
import Redis from 'ioredis';
import { CreateHotelDto } from 'src/modules/hotels/domain/dto/create-hotel.dto';
import { UpdateHotelDto } from 'src/modules/hotels/domain/dto/update-hotel.dto';

jest.mock('ioredis', () => {
  const moduleRedis = jest.fn().mockImplementation(() => ({
    del: jest.fn().mockResolvedValue(1),
    get: jest.fn().mockResolvedValue(JSON.stringify([{ key: 'mock-value' }])),
    quit: jest.fn().mockResolvedValue(null),
  }));
  return { __esModule: true, default: moduleRedis, Redis: moduleRedis }
});

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;
  let clientToken: string;
  let redisClient: Redis;
  let hotelId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    redisClient = new Redis();
    await app.init();

    const adminUser = await prisma.user.create({
      data: {
        USER_NAME: 'andre',
        USER_EMAIL: 'andreescampos@gmail.com',
        USER_PASSWORD: 'andre',
        USER_ROLE: Role.ADMIN,
      }
    });
    adminToken = jwt.sign(
      { sub: adminUser.id, role: Role.ADMIN },
      process.env.JWT_SECRET,
      { expiresIn: '1h', issuer: 'dnc_hotel', audience: 'users' },
    );

    const clientUser = await prisma.user.create({
      data: {
        USER_NAME: 'robo',
        USER_EMAIL: 'roboreserva.andre@gmail.com',
        USER_PASSWORD: 'robo',
        USER_ROLE: Role.USER,
      }
    });
    clientToken = jwt.sign(
      { sub: clientUser.id, role: Role.USER },
      process.env.JWT_SECRET,
      { expiresIn: '1h', issuer: 'dnc_hotel', audience: 'users' },
    );
  });

  afterAll(async () => {
    await prisma.hotel.deleteMany({});
    await prisma.user.deleteMany({});
    await redisClient.quit();
    await app.close();
  });

  it('/hotels/create (POST)', async () => {
    const createHotel: CreateHotelDto = {
      HOTEL_NAME: 'Nome do hotel',
      HOTEL_DESCRIPTION: 'desc...',
      HOTEL_PRICE: 300,
      HOTEL_ADDRESS: 'Rua 1',
      FK_HOTEL_OWNER_ID: 1,
    };
    const response = await request(app.getHttpServer())
      .post('/hotels/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(createHotel)
      .expect(201);

    hotelId = response.body.id;

    expect(response.body).toMatchObject({
      HOTEL_NAME: createHotel.HOTEL_NAME,
      HOTEL_DESCRIPTION: createHotel.HOTEL_DESCRIPTION,
      HOTEL_PRICE: createHotel.HOTEL_PRICE,
      HOTEL_ADDRESS: createHotel.HOTEL_ADDRESS,
    });
  });

  it('/hotels (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/hotels`)
      .set('Authorization', `Bearer ${clientToken}`)
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data).toHaveLength(1);
  });

  it('/hotels/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: hotelId,
      HOTEL_NAME: 'Nome do hotel'
    });
  });

  it('/hotels/update/:id (PATCH)', async () => {
    const updateHotel: UpdateHotelDto = {
      HOTEL_NAME: 'novo nome do hotel',
    };

    const response = await request(app.getHttpServer())
      .patch(`/hotels/update/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updateHotel)
      .expect(200);

    expect(response.body).toMatchObject({
      HOTEL_NAME: updateHotel.HOTEL_NAME,
    });
  });

  it('/hotels/upload-image/:id (PATCH)', async () => {
    await request(app.getHttpServer())
      .patch(`/hotels/upload-image/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .attach('HOTEL_IMAGE', Buffer.from('mock-file-content'), 'test-file.jpg')
      .expect(200);
  });

  it('/hotels/delete/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/hotels/delete/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });
});
