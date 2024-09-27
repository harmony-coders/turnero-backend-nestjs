import { UpdateProfessionalDto } from 'src/professional/dto/update-professional.dto';
import { Professional } from 'src/schemas/Professional.schema';

var _internalBD = new Map<string, Professional>();

export function addNew(newProfessional: Professional) {
  _internalBD.set(newProfessional._id, newProfessional);
}

export function getProfessional(professionalID: string) {
  if (professionalID === '') return;
  return _internalBD.get(professionalID);
}

export function clear() {
  _internalBD = new Map<string, Professional>();
}

export const LOCAL_BD = {
  addNew(newProfessional: Professional) {
    _internalBD.set(newProfessional._id, newProfessional);
  },
  getProfessional(professionalID: string) {
    if (professionalID === '') return;
    return _internalBD.get(professionalID);
  },
  clear() {
    _internalBD = new Map<string, Professional>();
  },
  getAllProfessionals() {
    return _internalBD.values();
  },

  updateProfessional(professionalID: string, mProfessional: UpdateProfessionalDto) {
    let aux = _internalBD.get(professionalID);
    //aux = { ...mProfessional };
    _internalBD.set(professionalID, aux);
  },
};
