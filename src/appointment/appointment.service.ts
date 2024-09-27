import { Injectable } from '@nestjs/common';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class AppointmentService {
  constructor(private mongoService: MongodbService) {}

  async getAppointmentId(_id: string) {
    return await this.mongoService.appointmentRepository.findOne(_id);
  }

  async existAppointmentOnDateTime(profesional_ID: string, service_ID: string, day: string, time: string) {
    const result = await this.getAllAppointmentByProfessionalAndService(profesional_ID, service_ID);
    if (result.length === 0) return false;

    const appointment_aux = result.find((x) => {
      return x.date === day && x.time === time;
    });

    return appointment_aux !== undefined;
  }

  async getAllAppointmentByProfessionalAndService(profesional_ID: string, service_ID: string) {
    return await this.mongoService.appointmentRepository.getAllAppointmentByProfessionalAndService(profesional_ID, service_ID);
  }
}
