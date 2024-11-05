import { Controller, Get, Post, Body, Patch, Delete, Query, UseGuards, Param, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UseInterceptors } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { User } from 'src/shared/decorators/user.decorator';
import { OwnerHotelGuard } from 'src/shared/guards/ownerHotel.guard';
import { CreateHotelService } from '../services/createHotel.service';
import { FindHotelByNameService } from '../services/findHotelByName.service';
import { FindHotelByOwnerService } from '../services/findHotelByOwner.service';
import { FindHotelByIdService } from '../services/findHotelById.service';
import { FindHotelsService } from '../services/findHotels.service';
import { UpdateHotelService } from '../services/updateHotel.service';
import { UploadImageHotelService } from '../services/uploadImageHotel.service';
import { DeleteHotelService } from '../services/deletedhotel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationInterceptor } from 'src/shared/interceptors/fileValidation.interceptor';

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
    private readonly uploadImageHotelService: UploadImageHotelService,
    private readonly deleteHotelService: DeleteHotelService,
  ) { }

  @Post('create')
  @Roles(Role.ADMIN)
  create(
    @User('id') id: number,
    @Body() createHotelDto: CreateHotelDto
  ) {
    return this.createHotelService.execute(id, createHotelDto);
  }

  @Get('name')
  findByName(
    @Query('name') name: string
  ) {
    return this.findHotelByNameService.execute(name);
  }

  @Get('owner')
  @Roles(Role.ADMIN)
  findByOwner(
    @User('id') id: number
  ) {
    return this.findHotelByOwnerService.execute(id);
  }

  @Get(':id')
  findById(
    @ParamId() id: number
  ) {
    return this.findHotelByIdService.execute(id);
  }

  @Get()
  findAll(
    @Query('page') page: string = "1",
    @Query('limit') limit: string = "10"
  ) {
    return this.findHotelsService.execute(Number(page), Number(limit));
  }

  @Patch('update/:id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerHotelGuard)
  update(
    @ParamId() id: number,
    @Body() updateHotelDto: UpdateHotelDto
  ) {
    return this.updateHotelService.execute(id, updateHotelDto);
  }

  @Patch('upload-image/:id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerHotelGuard)
  @UseInterceptors(FileInterceptor('HOTEL_IMAGE'), FileValidationInterceptor)
  uploadImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 900 * 1024 }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.uploadImageHotelService.execute(id, image.filename);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  @UseGuards(OwnerHotelGuard)
  remove(
    @ParamId() id: number
  ) {
    return this.deleteHotelService.execute(id);
  }
}
