import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { AppointmentService } from '../../entities/appointment-service.entity';
import { Client } from '../../entities/client.entity';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';
import { CreateBookingDto } from '../../dto/create-booking.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(AppointmentService)
    private appointmentServiceRepository: Repository<AppointmentService>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: [
        'client',
        'appointmentServices',
        'appointmentServices.service',
      ],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: [
        'client',
        'appointmentServices',
        'appointmentServices.service',
      ],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    // Create the appointment
    const appointment = this.appointmentsRepository.create({
      client: { id: createAppointmentDto.clientId },
      date: createAppointmentDto.date,
      time: createAppointmentDto.time,
      status: createAppointmentDto.status,
      notes: createAppointmentDto.notes,
    });

    const savedAppointment =
      await this.appointmentsRepository.save(appointment);

    // Create appointment-service relationships
    const appointmentServices = createAppointmentDto.serviceIds.map(
      (serviceId) => ({
        appointment: { id: savedAppointment.id },
        service: { id: serviceId },
      }),
    );

    await this.appointmentServiceRepository.save(appointmentServices);

    // Return the appointment with all relations loaded
    return this.findOne(savedAppointment.id);
  }

  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<Appointment> {
    // Create or find existing client
    let client = await this.clientsRepository.findOne({
      where: {
        email: createBookingDto.client.email,
        firstName: createBookingDto.client.firstName,
        lastName: createBookingDto.client.lastName,
      },
    });

    if (!client) {
      client = this.clientsRepository.create({
        firstName: createBookingDto.client.firstName,
        lastName: createBookingDto.client.lastName,
        email: createBookingDto.client.email,
        phone: createBookingDto.client.phone,
        dateOfBirth: createBookingDto.client.dateOfBirth
          ? new Date(createBookingDto.client.dateOfBirth)
          : undefined,
        address: createBookingDto.client.address,
        emergencyContact: createBookingDto.client.emergencyContact,
        medicalHistory: createBookingDto.client.medicalHistory,
      });
      client = await this.clientsRepository.save(client);
    }

    // Create the appointment
    const appointment = this.appointmentsRepository.create({
      client: { id: client.id },
      date: new Date(createBookingDto.date),
      time: createBookingDto.time,
      status: 'scheduled',
      notes: createBookingDto.notes,
    });

    const savedAppointment =
      await this.appointmentsRepository.save(appointment);

    // Create appointment-service relationships
    const appointmentServices = createBookingDto.serviceIds.map(
      (serviceId) => ({
        appointment: { id: savedAppointment.id },
        service: { id: serviceId },
      }),
    );

    await this.appointmentServiceRepository.save(appointmentServices);

    // Return the appointment with all relations loaded
    return this.findOne(savedAppointment.id);
  }
}
