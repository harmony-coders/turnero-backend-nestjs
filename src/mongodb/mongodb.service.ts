import { Injectable } from '@nestjs/common';
import { ProfessionalMongoRepository } from './repositories/professionalRepository';
import { AppointmentRepository } from './repositories/appointmentRepository';
import { AuthMongoRepository } from './repositories/authRepository';

@Injectable()
export class MongodbService {
  constructor(
    readonly professionalRepository: ProfessionalMongoRepository,
    readonly appointmentRepository: AppointmentRepository,
    readonly authRepository: AuthMongoRepository,
  ) {}
}
