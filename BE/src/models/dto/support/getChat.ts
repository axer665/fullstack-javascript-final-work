import { ID } from '@helpers/global';

export interface GetChatDto {
  userId: ID | null;
  isActive: boolean;
}
