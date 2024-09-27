import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Professional, ProfessionalSchema } from 'src/schemas/Professional.schema';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { ServiceService } from 'src/service/service.service';
import { AppointmentService } from 'src/appointment/appointment.service';

@Module({
  imports: [MongodbModule],
  controllers: [ProfessionalController],
  providers: [ProfessionalService, ServiceService, AppointmentService],
  exports: [ProfessionalService, ServiceService, AppointmentService],
})
export class ProfessionalModule {}
