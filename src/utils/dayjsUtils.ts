import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export function splitDayByFrecuency(from: Dayjs, until: Dayjs, frecuency: number, frecuencyType: ManipulateType) {
  let returned: string[] = [];
  if (from.isValid() && until.isValid() && frecuency > 0) {
    let aux = from.clone();
    while (aux.isBefore(until)) {
      returned.push(aux.format('HH:mm'));
      aux = aux.add(frecuency, frecuencyType);
    }
  }
  return returned;
}
