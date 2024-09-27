import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop()
  _id: string;

  @Prop({ index: true })
  professional_id: string;

  @Prop({ index: true })
  service_id: string;

  @Prop({ index: true })
  client_id: string;

  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop()
  state: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
AppointmentSchema.loadClass(Appointment);
