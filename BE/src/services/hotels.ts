import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '@helpers/global';
import { CreateDto } from '@dto/hotels/create';
import { SearchDto } from '@dto/hotels/search';
import { UpdateDto } from '@dto/hotels/update';
import { Hotels } from '@schema/hotels/hotels';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotels.name) private hotelsModel: Model<Hotels>) {}

  async create(createHotelDto: CreateDto): Promise<Hotels> {
    try {
      const createdHotel = new this.hotelsModel(createHotelDto);
      return createdHotel.save();
    } catch (error) {
      console.log('[ERROR]: HotelsService.create error:');
      console.error(error);
    }
  }

  async update(
    hotelId: ID,
    updateHotelDto: UpdateDto,
    images: string[],
  ): Promise<Hotels> {
    const data = { ...updateHotelDto, images };

    return this.hotelsModel.findByIdAndUpdate(
      { _id: hotelId },
      { $set: { ...data } },
      { new: true },
    );
  }

  async findById(hotelId: ID): Promise<Hotels> {
    const isValidId = mongoose.isValidObjectId(hotelId);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID отеля!');
    }

    const hotel = await this.hotelsModel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundException('Отель по такому ID не найден!');
    }

    return hotel;
  }

  async search(params: SearchDto): Promise<Hotels[]> {
    const { limit, offset, title } = params;
    const query = {
      title: { $regex: new RegExp(title, 'i') },
    };
    return this.hotelsModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0)
      .select('title description images');
  }
}
