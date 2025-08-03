import { ID } from '@helpers/global';

export interface MarkMessageDto {
  userId: ID;
  supportRequestId: ID;
  createdBefore: Date;
}
