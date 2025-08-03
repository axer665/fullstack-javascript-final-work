import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class SignUp {
  @IsNotEmpty({ message: 'Поле "e-mail" обязательно для заполнения' })
  @IsEmail(undefined, {
    message: 'Проверьте корректность поля e-mail',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Поле "Пароль" обязательно для заполнения' })
  @IsString()
  @MinLength(3, { message: 'Пароль не может быть короче 3 символов' })
  readonly password: string;

  @IsNotEmpty({ message: 'Поле "Имя" обязательно для заполнения' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly contactPhone?: string;
}
