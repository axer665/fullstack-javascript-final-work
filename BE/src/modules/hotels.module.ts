import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsController } from '@controllers/hotels';
import { HotelsService } from '@services/hotels';
import { Hotels, HotelsSchema } from '@schema//hotels/hotels';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotels.name, schema: HotelsSchema }]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule {}
