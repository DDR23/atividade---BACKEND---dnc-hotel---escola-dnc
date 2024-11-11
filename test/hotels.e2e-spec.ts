import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Role } from '@prisma/client';
import Redis from 'ioredis';

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
  let userToken: string;
  let redisClient: Redis;

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

    const normalUser = await prisma.user.create({
      data: {
        USER_NAME: 'robo',
        USER_EMAIL: 'roboreserva.andre@gmail.com',
        USER_PASSWORD: 'robo',
        USER_ROLE: Role.USER,
      }
    });
    userToken = jwt.sign(
      { sub: normalUser.id, role: Role.USER },
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
});
