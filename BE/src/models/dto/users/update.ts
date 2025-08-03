import { IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  readonly role: string;
}
