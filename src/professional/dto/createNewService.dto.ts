import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { ServiceAvailability } from 'src/schemas/ServiceAvailability.schema';

export class createNewServiceDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  depositAmount: number;
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true, type: () => ServiceAvailability })
  availability: ServiceAvailability[];
  @ApiProperty()
  serviceFrequency: number;
  @ApiProperty()
  servicesAllowedOverlap: string[];
}
