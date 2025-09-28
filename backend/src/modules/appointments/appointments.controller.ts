import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from '../../entities/appointment.entity';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';
import { CreateBookingDto } from '../../dto/create-booking.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findOne(+id);
  }

  @Post()
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Post('book')
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<Appointment> {
    return this.appointmentsService.createBooking(createBookingDto);
  }
}
