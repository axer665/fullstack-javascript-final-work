import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@modules//users.module';
import { Message, MessageSchema } from '@schema/support/message';
import { Support, SupportSchema } from '@schema/support/support';
import { SupportClientService } from '@services//support/supportClient';
import { SupportController } from '@controllers/support';
import { SupportEmployeeService } from '@services/support/supportEmployee';
import { SupportGateway } from '@gateways/support.gateway';
import { SupportService } from '@services/support/support';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Support.name, schema: SupportSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UsersModule,
  ],
  controllers: [SupportController],
  providers: [
    SupportService,
    SupportClientService,
    SupportEmployeeService,
    SupportGateway,
  ],
})
export class SupportModule {}
