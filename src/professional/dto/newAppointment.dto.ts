import { ApiProperty } from '@nestjs/swagger';

export class newAppointmentDTO {
  @ApiProperty()
  time: string;
  @ApiProperty()
  day: string;
}
