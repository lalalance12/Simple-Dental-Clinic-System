import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { AppointmentService } from '../../entities/appointment-service.entity';
import { Client } from '../../entities/client.entity';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../../dto/update-appointment.dto';

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
    // Validate that either clientId or client data is provided, but not both
    if (!createAppointmentDto.clientId && !createAppointmentDto.client) {
      throw new Error('Either clientId or client data must be provided');
    }
    if (createAppointmentDto.clientId && createAppointmentDto.client) {
      throw new Error('Cannot provide both clientId and client data');
    }

    let clientId: number;

    // Handle existing client (admin booking)
    if (createAppointmentDto.clientId) {
      clientId = createAppointmentDto.clientId;
    }
    // Handle new client (patient booking)
    else if (createAppointmentDto.client) {
      // Check if client already exists
      let client = await this.clientsRepository.findOne({
        where: {
          email: createAppointmentDto.client.email,
          firstName: createAppointmentDto.client.firstName,
          lastName: createAppointmentDto.client.lastName,
        },
      });

      if (!client) {
        client = this.clientsRepository.create({
          firstName: createAppointmentDto.client.firstName,
          lastName: createAppointmentDto.client.lastName,
          email: createAppointmentDto.client.email,
          phone: createAppointmentDto.client.phone,
          dateOfBirth: createAppointmentDto.client.dateOfBirth
            ? new Date(createAppointmentDto.client.dateOfBirth)
            : undefined,
          address: createAppointmentDto.client.address,
          emergencyContact: createAppointmentDto.client.emergencyContact,
          medicalHistory: createAppointmentDto.client.medicalHistory,
        });
        client = await this.clientsRepository.save(client);
      }

      clientId = client.id;
    } else {
      throw new Error('Invalid client data provided');
    }

    // Create the appointment
    const appointment = this.appointmentsRepository.create({
      client: { id: clientId },
      date: new Date(createAppointmentDto.date),
      time: createAppointmentDto.time,
      status: createAppointmentDto.status || 'scheduled',
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

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    await this.findOne(id); // This will throw NotFoundException if not found

    // Update the appointment
    await this.appointmentsRepository.update(id, {
      date: new Date(updateAppointmentDto.date),
      time: updateAppointmentDto.time,
      status: updateAppointmentDto.status,
      notes: updateAppointmentDto.notes,
    });

    // If serviceIds are provided, update the services
    if (updateAppointmentDto.serviceIds !== undefined) {
      // Delete existing appointment-service relationships
      await this.appointmentServiceRepository.delete({ appointment: { id } });

      // Create new appointment-service relationships
      if (updateAppointmentDto.serviceIds.length > 0) {
        const appointmentServices = updateAppointmentDto.serviceIds.map(
          (serviceId) => ({
            appointment: { id },
            service: { id: serviceId },
          }),
        );
        await this.appointmentServiceRepository.save(appointmentServices);
      }
    }

    // Return the updated appointment with all relations loaded
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // This will throw NotFoundException if not found

    // Delete appointment-service relationships first
    await this.appointmentServiceRepository.delete({ appointment: { id } });

    // Then delete the appointment
    await this.appointmentsRepository.delete(id);
  }
}
