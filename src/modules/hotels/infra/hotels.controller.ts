import { Controller, Get, Post, Body, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/hotelCreate.dto';
import { UpdateHotelDto } from '../domain/dto/hotelUpdate.dto';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateHotelService } from '../services/createHotel.service';
import { FindHotelByNameService } from '../services/findHotelByName.service';
import { FindHotelByOwnerService } from '../services/findHotelByOwner.service';
import { FindHotelByIdService } from '../services/findHotelById.service';
import { FindHotelsService } from '../services/findHotels.service';
import { OwnerHotelGuard } from 'src/shared/guards/ownerHotel.guard';
import { UpdateHotelService } from '../services/updateHotel.service';
// import { DeleteHotelService } from '../services/deletedhotel.service';

@Controller('hotels')
@UseGuards(AuthGuard, RoleGuard)
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelService,
    private readonly findHotelByNameService: FindHotelByNameService,
    private readonly findHotelByOwnerService: FindHotelByOwnerService,
    private readonly findHotelByIdService: FindHotelByIdService,
    private readonly findHotelsService: FindHotelsService,
    private readonly updateHotelService: UpdateHotelService,
    // private readonly deleteHotelService: DeleteHotelService,
  ) { }

  @Post('create')
  @Roles(Role.ADMIN)
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto);
  }

  @Get('name')
  findByName(@Query('name') name: string) {
    return this.findHotelByNameService.execute(name);
  }

  @Get('owner/:id')
  @Roles(Role.ADMIN)
  findByOwner(@ParamId() id: number) {
    return this.findHotelByOwnerService.execute(id);
  }

  @Get(':id')
  findById(@ParamId() id: number) {
    return this.findHotelByIdService.execute(id);
  }

  @Get()
  findAll() {
    return this.findHotelsService.execute();
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerHotelGuard)
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelService.execute(id, updateHotelDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerHotelGuard)
  remove(@ParamId() id: number) {
    // return this.deleteHotelService.execute(id);
  }
}
