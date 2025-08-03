import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsController } from '@controllers/rooms';
import { RoomsService } from '@services/rooms';
import { Rooms, RoomsSchema } from '@schema/rooms/rooms';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rooms.name, schema: RoomsSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
