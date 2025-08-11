import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '@enums/UserRole';

export class UpdateDto {
  @IsString()
  @IsEnum(UserRole, {
    message: 'Доступные роли: Администратор, Модератор, Клиент... других нет',
  })
  readonly role: string;
}
