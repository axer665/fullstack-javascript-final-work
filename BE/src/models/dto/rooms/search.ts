import { ID } from '@helpers/global';

export interface SearchDto {
  hotel: ID;
  title?: any;
  limit?: number;
  offset?: number;
  isEnabled?: string;
}
