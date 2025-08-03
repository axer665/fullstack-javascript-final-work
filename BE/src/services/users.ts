import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '@helpers/global';
import { CreateDto } from '@dto/users/create';
import { SearchDto } from '@dto//users/search';
import { Users } from '@schema/users/users';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(createUserDto: CreateDto): Promise<Users> {
    try {
      const createdUser = new this.usersModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      console.log('[ERROR]: UsersService.create error:');
      console.error(error);
    }
  }

  async findAll(params: Partial<SearchDto>): Promise<Users[]> {
    const { limit, offset, email, name, contactPhone } = params;
    const query = {
      email: { $regex: new RegExp(email, 'i') },
      name: { $regex: new RegExp(name, 'i') },
      contactPhone: { $regex: new RegExp(contactPhone, 'i') },
    };
    return this.usersModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0)
      .select('email name contactPhone role');
  }

  async findById(id: ID): Promise<Users> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID пользователя!');
    }

    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return user;
  }

  // Поиск пользователя по email
  async findByEmail(email: string): Promise<Users> | null {
    return this.usersModel.findOne({ email });
  }

  async updateRole(userId: ID, role: string): Promise<Users> {
    return this.usersModel
      .findByIdAndUpdate({ _id: userId }, { $set: { role } }, { new: true })
      .select('email');
  }
}
