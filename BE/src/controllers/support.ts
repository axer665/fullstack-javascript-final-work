import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@decorators/roles.decorator';
import { GuardJwtAuth } from '@guards/authGuard';
import { GuardRole } from '@guards/roleGuard';
import { ID } from '@helpers/global';
import { CreateDto } from '@dto/support/create';
import { GetChatDto } from '@dto/support/getChat';
import { MarkMessageDto } from '@dto/support/markMessage';
import { SendMessageDto } from '@dto/support/sendMessage';
import { Message } from '@schema/support/message';
import { Support } from '@schema/support/support';
import { SupportClientService } from '@services/support/supportClient';
import { SupportEmployeeService } from '@services/support/supportEmployee';
import { SupportService } from '@services/support/support';

@UseGuards(GuardJwtAuth, GuardRole)
@Controller('api/support')
export class SupportController {
  constructor(
    private supportService: SupportService,
    private supportClientService: SupportClientService,
    private supportEmployeeService: SupportEmployeeService,
  ) {}

  @Roles('client')
  @Post()
  async createSupportRequest(@Body() body: CreateDto) {
    const newRequest =
      await this.supportClientService.createSupportRequest(body);

    await this.supportService.sendMessage({
      authorId: body.userId,
      supportRequestId: newRequest._id,
      text: body.text,
    });

    const unReadCount = await this.supportClientService.getUnreadCount(
      newRequest._id,
    );

    return {
      id: newRequest._id,
      createdAt: newRequest['createdAt'],
      isActive: newRequest.isActive,
      hasNewMessages: unReadCount.length > 0,
    };
  }

  @Roles('client', 'manager', 'admin')
  @Get()
  findSupportRequests(@Query() params: GetChatDto): Promise<Support[]> {
    return this.supportService.findSupportRequests(params);
  }

  @Roles('client', 'manager', 'admin')
  @Post('/sendmessage')
  sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<Message> {
    return this.supportService.sendMessage(sendMessageDto);
  }

  @Roles('client', 'manager', 'admin')
  @Get('/getmessages/:id')
  getMessages(
    @Param('id') supportRequestId: ID,
    @Query() data: { userId: ID },
  ): Promise<Message[]> {
    console.log('get nessage query data:');
    console.log(data);
    return this.supportService.getMessages(supportRequestId, data.userId);
  }

  @Roles('client', 'manager', 'admin')
  @Post('/readmessages')
  markMessagesAsRead(
    @Body() markMessagesAsReadDto: MarkMessageDto,
    @Request() request: any,
  ) {
    if (request.user?.role === 'client') {
      this.supportClientService
        .markMessagesAsRead(markMessagesAsReadDto)
        .then(() => {});
    } else if (
      request.user?.role === 'manager' ||
      request.user?.role === 'admin'
    ) {
      this.supportEmployeeService
        .markMessagesAsRead(markMessagesAsReadDto)
        .then(() => {});
    }
  }

  @Roles('manager', 'admin')
  @Post('/closerequest/:id')
  async closeRequest(@Param('id') supportRequestId: ID) {
    await this.supportEmployeeService.closeRequest(supportRequestId);
  }
}
