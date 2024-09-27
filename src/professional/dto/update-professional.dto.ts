import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalDto } from './create-professional.dto';

export class UpdateProfessionalDto {
  name: string;
  description: string;
  email: string;
  phone: string;
  mapURL: string;
  imageURL: string;
}
