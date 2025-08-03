import { Global, Module } from '@nestjs/common';
import { SocketService } from '@services/socket';

@Global()
@Module({
  controllers: [],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
