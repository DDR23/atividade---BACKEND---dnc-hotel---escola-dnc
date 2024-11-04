import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/hotelCreate.dto';
import { UpdateHotelDto } from '../domain/dto/hotelUpdate.dto';
import { CreateHotelService } from '../services/createHotel.service';
// import { DeleteHotelService } from '../services/deletedhotel.service';
// import { FindHotelByIdService } from '../services/findHotelById.service';
// import { FindHotelByNameService } from '../services/findHotelByName.service';
// import { FindHotelsService } from '../services/findHotels.service';
// import { UpdateHotelService } from '../services/updateHotel.service';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelService,
    // private readonly findHotelByIdService: FindHotelByIdService,
    // private readonly findHotelByNameService: FindHotelByNameService,
    // private readonly findHotelsService: FindHotelsService,
    // private readonly updateHotelService: UpdateHotelService,
    // private readonly deleteHotelService: DeleteHotelService,
  ) { }

  @Post('create')
  /**
   * Creates a new hotel.
   *
   * @param createHotelDto The information to create a new hotel.
   * @returns The created hotel.
   */
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    // return this.findHotelByIdService.execute(+id);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    // return this.findHotelByNameService.execute(name);
  }

  @Get()
  findAll() {
    // return this.findHotelsService.execute();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    // return this.updateHotelService.execute(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.deleteHotelService.execute(+id);
  }
}
