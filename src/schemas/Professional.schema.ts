import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Service, ServiceSchema } from './Service.schema';
import { createNewServiceDTO } from 'src/professional/dto/createNewService.dto';
import { BadRequestException } from '@nestjs/common';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { v4 as uuidv4 } from 'uuid';
dayjs.extend(customParseFormat);

export type ProfessionalDocument = Professional & Document;

@Schema()
export class Professional {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  mapURL: string;
  @Prop()
  imageURL: string;

  @Prop({ type: [ServiceSchema] })
  services: Service[];
  //bankingInfo: BankingInfoType;

  addNewService(newService: createNewServiceDTO) {
    try {
      let errors: string[] = [];
      let nService = new Service();
      Object.assign(nService, newService);

      let serviceSet = new Set<number>();

      if (newService.serviceFrequency <= 0) {
        errors.push('frequency cannot be lower or equal 0');
      }
      nService.availability.forEach((_avaliability) => {
        if (_avaliability.day > 6) {
          errors.push('inexistent day');
          return;
        }
        console.log(_avaliability);

        if (!_avaliability.time || _avaliability.time.length === 0) {
          errors.push('time inexistent');
        } else {
          _avaliability.time.forEach((_time) => {
            if (newService.serviceFrequency) {
              _time.frecuency = newService.serviceFrequency;
            } else {
              if (_time.frecuency <= 0) {
                errors.push('frequency cannot be lower or equal 0');
              }
            }

            let time_since = dayjs(_time.timeSince, 'HH:mm', true);

            let time_until = dayjs(_time.timeUntil, 'HH:mm', true);
            if (!time_since.isValid()) {
              errors.push('timeSince is invalid');
            }
            if (!time_until.isValid()) {
              errors.push('timeUntil is invalid');
            }
            if (time_since.isAfter(time_until)) {
              errors.push('timeFrom has to be less than timeUntil');
            }
          });
        }

        if (serviceSet.has(_avaliability.day)) {
          errors.push('dias repetidos');
          //error, no deberia haber dias repetidos
          //Merge ??
        } else {
          serviceSet.add(_avaliability.day);
        }
      });

      if (nService.servicesAllowedOverlap?.length > 0) {
        nService.servicesAllowedOverlap.forEach((_serviceAllowed) => {
          if (this.getServiceByID(_serviceAllowed) === undefined) {
            errors.push('service ' + _serviceAllowed + ' no existe');
          }
        });
      }
      if (errors.length > 0) {
        return errors;
      }
      if (!this.services) {
        this.services = [];
      }
      if (this.services.length > 0) {
      }
      nService._id = uuidv4();

      this.services.push(nService);
    } catch (error) {
      return error;
    }
  }

  modifyService(service_id: string, mService: createNewServiceDTO) {
    let service = this.getServiceByID(service_id);
    if (!service) {
      throw new BadRequestException('service not found');
    }
    Object.assign(service, mService);
  }

  getServiceByID(serviceID: string) {
    if (this.services.length === 0) {
      return;
    }
    if (!serviceID && serviceID !== '') {
      return;
    }
    return this.services.find((_services) => {
      return _services._id === serviceID;
    });
  }
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
ProfessionalSchema.loadClass(Professional);
