import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import { AuthorisationModule } from '@modules/authorisation.module';
import { RoomsModule } from '@modules/rooms.module';
import { HotelsModule } from '@modules/hotels.module';
import { ReservationsModule } from '@modules/reservations.module';
import { SocketModule } from '@modules/socket.module';
import { SupportModule } from '@modules/support.module';
import { UsersModule } from '@modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot('mongodb://mongo:27017/test'),

    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 100,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    UsersModule,
    AuthorisationModule,
    HotelsModule,
    RoomsModule,
    ReservationsModule,
    SupportModule,
    SocketModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
