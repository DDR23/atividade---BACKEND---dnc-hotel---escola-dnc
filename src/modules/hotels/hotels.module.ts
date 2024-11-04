import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelService } from './services/createHotel.service';
import { DeleteHotelService } from './services/deletedhotel.service';
import { FindHotelByIdService } from './services/findHotelById.service';
import { FindHotelByNameService } from './services/findHotelByName.service';
import { FindHotelsService } from './services/findHotels.service';
import { UpdateHotelService } from './services/updateHotel.service';
import { HotelsRepositories } from './infra/hotels.repositories';
import { PrismaModule } from '../prisma/prisma.module';
import { FindHotelByOwnerService } from './services/findHotelByOwner.service';

@Module({
  imports: [PrismaModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelService,
    DeleteHotelService,
    FindHotelByNameService,
    FindHotelByOwnerService,
    FindHotelByIdService,
    FindHotelsService,
    UpdateHotelService,
    {
      provide: 'HOTEL_SERVICE_TOKEN',
      useClass: HotelsRepositories
    }
  ],
})
export class HotelsModule { }
