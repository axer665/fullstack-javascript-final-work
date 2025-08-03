import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ID } from '@helpers/global';

export class CreateDto {
  @IsNotEmpty({
    message: 'ID отеля является обязательным для заполнения',
  })
  @IsString()
  readonly hotel: ID;

  @IsNotEmpty({
    message: 'Название комнаты является обязательным для заполнения полем',
  })
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  images?: any;
}
