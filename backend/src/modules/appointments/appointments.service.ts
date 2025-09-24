import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ['client', 'service'],
    });
  }

  findOne(id: number): Promise<Appointment> {
    return this.appointmentsRepository.findOne({
      where: { id },
      relations: ['client', 'service'],
    });
  }

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create({
      client: { id: createAppointmentDto.clientId },
      service: { id: createAppointmentDto.serviceId },
      date: createAppointmentDto.date,
      time: createAppointmentDto.time,
      status: createAppointmentDto.status,
    });
    return this.appointmentsRepository.save(appointment);
  }
}
