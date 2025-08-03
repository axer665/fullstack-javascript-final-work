import { ID } from 'app/helpers/global';

export interface AuthorisationDto {
  id: ID;
  role: string;
  token: string;
}
