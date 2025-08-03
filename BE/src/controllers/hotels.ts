import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MulterFilesInterceptor } from 'app/interceptors/fileUpload';
import { Roles } from 'app/decorators/roles.decorator';
import { ID } from 'app/helpers/global';
import { CreateDto } from '@dto/hotels/create';
import { SearchDto } from '@dto/hotels/search';
import { UpdateDto } from '@dto/hotels/update';
import { HotelsService } from '@services/hotels';
import { Hotels } from '@schema/hotels/hotels';
import { GuardJwtAuth } from 'app/guards/authGuard';
import { GuardRole } from 'app/guards/roleGuard';

@Controller('api/hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Post()
  @UseGuards(GuardJwtAuth, GuardRole)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  createHotel(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createHotelDto: CreateDto,
  ): Promise<Hotels> {
    const data = { ...createHotelDto };

    if (images?.length) {
      data.images = images.map((img) => img.filename);
    }

    return this.hotelsService.create(data);
  }

  @Put(':id')
  @UseGuards(GuardJwtAuth, GuardRole)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  updateHotel(
    @Param('id') hotelId: ID,
    @Body() updateHotelDto: UpdateDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Hotels> {
    return this.hotelsService.update(
      hotelId,
      updateHotelDto,
      images.map((img) => img.filename),
    );
  }

  @Get()
  searchHotels(@Query() searchParams: SearchDto): Promise<Hotels[]> {
    return this.hotelsService.search(searchParams);
  }

  @Get('/findhotel/:id')
  findById(@Param('id') hotelId: ID): Promise<Hotels> {
    return this.hotelsService.findById(hotelId);
  }
}
