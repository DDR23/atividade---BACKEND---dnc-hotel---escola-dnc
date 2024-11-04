import { forwardRef, Module } from '@nestjs/common';
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
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
  ],
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
