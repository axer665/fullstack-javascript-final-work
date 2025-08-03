import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '@helpers/global';
import { CreateDto } from '@dto/rooms/create';
import { SearchDto } from '@dto/rooms/search';
import { UpdateDto } from '@dto/rooms/update';
import { Rooms } from '@schema/rooms/rooms';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Rooms.name) private roomsModel: Model<Rooms>) {}

  async create(createRoomDto: CreateDto): Promise<Rooms> {
    const isValidId = mongoose.isValidObjectId(createRoomDto.hotel);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID отеля!');
    }

    const data = {
      ...createRoomDto,
      isEnabled: true,
    };

    try {
      const createdRoom = new this.roomsModel(data);
      return createdRoom.save();
    } catch (e) {
      console.log('[ERROR]: roomsService.create error:');
      console.error(e);
    }
  }

  async update(
    roomId: ID,
    updateRoomDto: UpdateDto,
    images: string[],
  ): Promise<Rooms> {
    const data = { ...updateRoomDto, images };

    return this.roomsModel.findByIdAndUpdate(
      { _id: roomId },
      { $set: { ...data } },
      { new: true },
    );
  }

  async findById(roomId: ID): Promise<Rooms> {
    const isValidId = mongoose.isValidObjectId(roomId);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID комнаты!');
    }

    const room = await this.roomsModel.findById(roomId);
    if (!room) {
      throw new NotFoundException('Отель по такому ID не найден!');
    }

    return room;
  }

  async search(params: SearchDto): Promise<Rooms[]> {
    const { limit, offset, hotel, isEnabled, title } = params;
    const query: Partial<SearchDto> = {
      hotel,
      title: { $regex: new RegExp(title, 'i') },
    };

    if (typeof isEnabled !== 'undefined') {
      query.isEnabled = isEnabled;
    }

    return this.roomsModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0);
  }
}
