import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServiceAvailability, ServiceAvailabilitySchema } from './ServiceAvailability.schema';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
import { splitDayByFrecuency } from 'src/utils/dayjsUtils';

export type ServiceDocument = Service & Document;
@Schema()
export class Service {
  @Prop()
  _id: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: [ServiceAvailabilitySchema] })
  availability: ServiceAvailability[];
  @Prop()
  showNotificationToUser: boolean;
  @Prop()
  servicesAllowedOverlap: string[];
  @Prop()
  depositAmount: number;

  isTimeValid(day: string, time: string): boolean {
    if (time && day) {
      let requestAppointment = dayjs(day + '-' + time, 'DD/MM/YYYY-HH:mm', true);

      if (requestAppointment.isValid()) {
        let currentDayWeek = Number.parseInt(requestAppointment.format('d'));
        let tempAvailability = this.availability.find((x) => {
          return x.day === currentDayWeek;
        });

        if (tempAvailability) {
          let requestOnlyTime = dayjs(time, 'HH:mm', true);
          let auxPush = [];
          tempAvailability.time.forEach((element) => {
            let auxTimeSince = dayjs(element.timeSince, 'HH:mm', true);
            let auxTimeUntil = dayjs(element.timeUntil, 'HH:mm', true);

            if (requestOnlyTime.isBetween(auxTimeSince, auxTimeUntil, 'minute', '[]')) {
              auxPush.push(splitDayByFrecuency(auxTimeSince, auxTimeUntil, element.frecuency, 'minute'));
            }
          });

          if (auxPush.length > 0) {
            let existTime: string;
            auxPush.forEach((element: string[]) => {
              console.log(element);

              existTime = element.find((x: string) => {
                return time === x;
              });
              console.log(existTime);
            });
            if (existTime) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  calculateAvailability() {
    if (this.availability.length === 0) return;
    let result: { day: string; time: string[] }[] = [];
    let from = dayjs().add(1, 'day');
    let dayjsAux = from.clone();
    let until = dayjs().add(2, 'month');
    for (let index = 0; index < 7; index++) {
      let auxAvailability = this.availability.find((_availability) => {
        return _availability.day === Number.parseInt(dayjsAux.format('d'));
      });
      if (auxAvailability) {
        let aux = [];
        auxAvailability.time.forEach((element) => {
          aux = aux.concat(splitDayByFrecuency(dayjs(element.timeSince, 'HH:mm', true), dayjs(element.timeUntil, 'HH:mm', true), element.frecuency, 'minute'));
        });
        result.push({ day: dayjsAux.format('DD/MM/YYYY'), time: aux });
        let auxWeek = dayjsAux.clone().add(1, 'week');
        while (auxWeek.isBefore(until)) {
          result.push({ day: auxWeek.format('DD/MM/YYYY'), time: aux });
          auxWeek = auxWeek.add(1, 'week');
        }
      }
      dayjsAux = dayjsAux.add(1, 'day');
    }
    return result;
  }
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
ServiceSchema.loadClass(Service);
