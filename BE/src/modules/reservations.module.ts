import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from '@modules/rooms.module';
import { HotelsModule } from '@modules/hotels.module';
import { UsersModule } from '@modules/users.module';
import { ReservationsController } from '@controllers/reservations';
import { ReservationsService } from '@services//reservations';
import {
  Reservations,
  ReservationsSchema,
} from '@schema/reservations/reservations';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservations.name, schema: ReservationsSchema },
    ]),
    UsersModule,
    HotelsModule,
    RoomsModule,
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
