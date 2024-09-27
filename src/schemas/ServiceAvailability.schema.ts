import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimeAvaliability, TimeAvaliabilitySchema } from './TimeAvaliability.schema';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type ServiceAvaliabilityDocument = ServiceAvailability & Document;
@Schema({ _id: false })
export class ServiceAvailability {
  @ApiProperty({ minimum: 0, maximum: 6 })
  @Prop()
  day: number;
  @Prop({ type: [TimeAvaliability], schema: TimeAvaliabilitySchema })
  @ApiProperty({ isArray: true, type: () => TimeAvaliability })
  time: TimeAvaliability[];
}

export const ServiceAvailabilitySchema = SchemaFactory.createForClass(ServiceAvailability);
ServiceAvailabilitySchema.loadClass(ServiceAvailability);
