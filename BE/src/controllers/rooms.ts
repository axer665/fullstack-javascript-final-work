import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MulterFilesInterceptor } from 'app/interceptors/fileUpload';
import { Roles } from '@decorators/roles.decorator';
import { GuardJwtAuth } from '@guards/authGuard';
import { GuardRole } from '@guards/roleGuard';
import { ID } from '@helpers/global';
import { CreateDto } from '@dto/rooms/create';
import { SearchDto } from '@dto/rooms/search';
import { UpdateDto } from '@dto/rooms/update';
import { RoomsService } from '@services/rooms';
import { Rooms } from '@schema/rooms/rooms';

@Controller('api/rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  private logger: Logger = new Logger('AppGateway');
  @Post()
  @UseGuards(GuardJwtAuth, GuardRole)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  createRoom(
    @Body() createRoomDto: CreateDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Rooms> {
    const data = { ...createRoomDto };
    this.logger.log(images);
    if (images?.length) {
      data.images = images.map((img) => img.filename);
    }

    return this.roomsService.create(data);
  }

  @Put(':id')
  @UseGuards(GuardJwtAuth, GuardRole)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  updateRoom(
    @Param('id') roomId: ID,
    @Body() updateRoomDto: UpdateDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Rooms> {
    this.logger.log('images:');
    this.logger.log(images);
    return this.roomsService.update(
      roomId,
      updateRoomDto,
      images.map((img) => img.filename),
    );
  }

  @Get()
  searchHotels(@Query() searchParams: SearchDto): Promise<Rooms[]> {
    return this.roomsService.search(searchParams);
  }
}
