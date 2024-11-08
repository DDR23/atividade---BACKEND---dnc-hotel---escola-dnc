import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { HotelsRepository } from './infra/hotels.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateHotelService } from './services/createHotel.service';
import { FindHotelByNameService } from './services/findHotelByName.service';
import { FindHotelByOwnerService } from './services/findHotelByOwner.service';
import { FindHotelByIdService } from './services/findHotelById.service';
import { FindHotelsService } from './services/findHotels.service';
import { UpdateHotelService } from './services/updateHotel.service';
import { UploadImageHotelService } from './services/uploadImageHotel.service';
import { DeleteHotelService } from './services/deletedhotel.service';
import { HOTEL_SERVICE_TOKEN } from './uitls/hotelServiceToken';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/hotels',
        filename: (_req, file, cb) => {
          const filename = `${uuidv4()}${file.originalname}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [
    HotelsController,
  ],
  providers: [
    CreateHotelService,
    FindHotelByNameService,
    FindHotelByOwnerService,
    FindHotelByIdService,
    FindHotelsService,
    UpdateHotelService,
    UploadImageHotelService,
    DeleteHotelService,
    {
      provide: HOTEL_SERVICE_TOKEN,
      useClass: HotelsRepository
    },
  ],
  exports: [
    FindHotelByIdService,
  ]
})
export class HotelsModule { }
