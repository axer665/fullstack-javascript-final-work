import { ID } from '@helpers/global';

export interface SendMessageDto {
  authorId: ID;
  supportRequestId: ID;
  text: string;
}
