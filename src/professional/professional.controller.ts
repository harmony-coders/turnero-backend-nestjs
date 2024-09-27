import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { createNewServiceDTO } from './dto/createNewService.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { newAppointmentDTO } from './dto/newAppointment.dto';
import { AuthHTTPGuard } from 'src/auth/auth.guard';

@ApiTags('Professionals')
@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  createProfessional(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalService.create(createProfessionalDto);
  }

  @Get()
  findAll(@Query() query) {
    if (query) {
      if (query['headers'] === 'true') {
        return this.professionalService.getAllHeaders();
      }
    }

    return this.professionalService.findAll();
  }

  @Get(':professionalid')
  findOne(@Param('professionalid') id: string) {
    return this.professionalService.findOne(id);
  }

  @Patch(':professionalid')
  update(@Param('professionalid') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalService.update(id, updateProfessionalDto);
  }

  @Get(':professionalid/services')
  getAllServices(@Param('professionalid') id: string) {
    return this.professionalService.getAllServices(id);
  }
  @UseGuards(AuthHTTPGuard)
  @ApiBearerAuth('JWT-auth')
  @Post(':professionalid/services')
  addNewService(@Param('professionalid') id: string, @Body() newService: createNewServiceDTO, @Request() req) {
    return this.professionalService.addNewService(req['user'].sub, newService);
  }

  @Get(':professionalid/services/:serviceid/availability')
  getServiceAvailability(@Param('professionalid') profesionalid: string, @Param('serviceid') serviceID: string) {
    return this.professionalService.getAvailability(profesionalid, serviceID);
  }

  @Post(':professionalid/services/:serviceid/appointment')
  newAppointment(@Param('professionalid') profesionalid: string, @Param('serviceid') serviceID: string, @Body() payload: newAppointmentDTO) {
    return this.professionalService.newAppointment(profesionalid, serviceID, payload.day, payload.time);
  }
}
