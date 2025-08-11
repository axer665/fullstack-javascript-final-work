import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '@enums/UserRole';

export class CreateDto {
  @IsNotEmpty({ message: 'Email является обязательным для заполнения полем' })
  @IsEmail(undefined, {
    message: 'Email введён некорректно',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль является обязательным для заполнения полем' })
  @IsString()
  readonly passwordHash: string;

  @IsNotEmpty({ message: 'Имя является обязательным для заполнения полем' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly contactPhone?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserRole, {
    message: 'Доступные роли: Администратор, Модератор, Клиент... других нет',
  })
  readonly role?: string;
}
