import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Rooms>;

@Schema({
  timestamps: true,
})
export class Rooms {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels', required: true })
  hotel: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true })
  isEnabled: boolean;
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
