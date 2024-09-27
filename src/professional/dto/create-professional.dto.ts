import { IsNotEmpty, IsUrl } from 'class-validator';
import { BankingInfoType, ProfessionalType, ServiceType } from 'src/types/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfessionalDto {
  @ApiProperty({ required: true, default: '' })
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional({ default: '' })
  description: string;
  @ApiPropertyOptional({ default: '' })
  email: string;
  @ApiPropertyOptional({ default: '' })
  phone: string;
  @ApiPropertyOptional({ default: '' })
  mapURL: string;
  @ApiPropertyOptional({ default: '' })
  imageURL?: string;
}
