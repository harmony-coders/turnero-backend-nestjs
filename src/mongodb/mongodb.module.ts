import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Professional, ProfessionalSchema } from 'src/schemas/Professional.schema';
import { MongodbService } from './mongodb.service';
import { ProfessionalMongoRepository } from './repositories/professionalRepository';
import { Appointment, AppointmentSchema } from 'src/schemas/appointment.schema';
import { AppointmentRepository } from './repositories/appointmentRepository';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import { AuthMongoRepository } from './repositories/authRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
  exports: [MongooseModule, MongodbService, ProfessionalMongoRepository, AppointmentRepository, AuthMongoRepository],
  providers: [MongodbService, ProfessionalMongoRepository, AppointmentRepository, AuthMongoRepository],
})
export class MongodbModule {}
