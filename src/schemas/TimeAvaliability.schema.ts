import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
export type TimeAvaliabilityDocument = TimeAvaliability & Document;

@Schema({ _id: false })
export class TimeAvaliability {
  @ApiProperty()
  @Prop()
  timeSince: string;
  @Prop()
  @ApiProperty()
  timeUntil: string;
  @Prop()
  @ApiProperty()
  frecuency: number;
  @Prop()
  @ApiProperty()
  modality: string;
}
export const TimeAvaliabilitySchema = SchemaFactory.createForClass(TimeAvaliability);
TimeAvaliabilitySchema.loadClass(TimeAvaliability);
