import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { v4 as uuidv4 } from 'uuid';
import { Professional } from 'src/schemas/Professional.schema';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { createNewServiceDTO } from './dto/createNewService.dto';
import { AppointmentService } from 'src/appointment/appointment.service';
import { Appointment } from 'src/schemas/appointment.schema';
import { AuthHTTPGuard } from 'src/auth/auth.guard';

@Injectable()
export class ProfessionalService {
  constructor(
    private mongoService: MongodbService,
    private appointmentService: AppointmentService,
  ) {}
  create(createProfessionalDto: CreateProfessionalDto) {
    let nProfessional = new Professional();
    nProfessional._id = uuidv4();
    nProfessional.services = [];
    Object.assign(nProfessional, createProfessionalDto);
    this.mongoService.professionalRepository.create(nProfessional);
  }

  findAll() {
    return this.mongoService.professionalRepository.findAll();
  }

  async getAllHeaders() {
    return await this.mongoService.professionalRepository.getHeaders();
  }

  async findOne(id: string) {
    if (id === '') return;
    return await this.mongoService.professionalRepository.findOne(id);
  }

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto) {
    let professional = await this.findOne(id);

    Object.assign(professional, updateProfessionalDto);

    this.mongoService.professionalRepository.update(id, professional);
  }

  remove(id: number) {
    return `This action removes a #${id} professional`;
  }

  async addNewService(id: string, newService: createNewServiceDTO) {
    let professional = await this.findOne(id);
    const errors = professional.addNewService(newService);
    this.mongoService.professionalRepository.update(id, professional);

    return errors;
  }

  async getAllServices(id: string) {
    let professional = await this.findOne(id);
    return professional.services;
  }

  async getAvailability(id: string, serviceID: string) {
    let professional = await this.findOne(id);
    if (!professional) return;
    let selectedService = professional.getServiceByID(serviceID);
    if (!selectedService) return;
    let resultAvailability = selectedService.calculateAvailability();
    let existentAppointment = await this.appointmentService.getAllAppointmentByProfessionalAndService(id, serviceID);
    if (existentAppointment.length === 0) {
      return resultAvailability;
    }
    let aux: { day: string; time: string[] }[] = [];
    resultAvailability.forEach((x) => {
      x.time.forEach((element) => {});

      let filterer = x.time.filter((t) => {
        return !existentAppointment.find((e) => {
          return e.date === x.day && t === e.time;
        });
      });
      if (filterer.length > 0) {
        aux.push({ day: x.day, time: filterer });
      }
    });
    return aux;
  }

  async newAppointment(professional_id: string, serviceID: string, day: string, time: string) {
    let professional = await this.findOne(professional_id);
    if (!professional) return;
    let selectedService = professional.getServiceByID(serviceID);
    if (!selectedService) return;
    let isValidTime = selectedService.isTimeValid(day, time);
    if (isValidTime) {
      let existAppointmentOnBD = await this.appointmentService.existAppointmentOnDateTime(professional._id, selectedService._id, day, time);
      if (!existAppointmentOnBD) {
        let appointment = new Appointment();
        appointment._id = uuidv4();
        appointment.client_id = '';
        appointment.date = day;
        appointment.professional_id = professional_id;
        appointment.service_id = serviceID;
        appointment.time = time;
        //Esto tiene que estar en el service de appointment
        this.mongoService.appointmentRepository.create(appointment);
      }
    }

    //Es un horario valido
    //No esta ocupado
    //Se overlap con otro servicio
  }
}
