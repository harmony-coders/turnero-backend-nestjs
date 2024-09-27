import { Appointment, AppointmentDocument } from 'src/schemas/appointment.schema';
import { BaseMongoRepository } from './baseMongoRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class AppointmentRepository extends BaseMongoRepository<Appointment> {
  constructor(@InjectModel(Appointment.name) private entity: Model<AppointmentDocument>) {
    super(entity);
  }

  existAppointment() {}

  async getAllAppointmentByProfessionalAndService(professional_id: string, service_id: string): Promise<Appointment[]> {
    return await this.entity.find().where('professional_id').equals(professional_id).where('service_id').equals(service_id).exec();
  }
}
