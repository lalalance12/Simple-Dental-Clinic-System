import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { AppointmentsService } from './appointments.service';
import { Appointment } from '../../entities/appointment.entity';
import { AppointmentService } from '../../entities/appointment-service.entity';
import { Client } from '../../entities/client.entity';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../../dto/update-appointment.dto';
import { NotFoundException } from '@nestjs/common';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentRepo: Repository<Appointment>;
  let appointmentServiceRepo: Repository<AppointmentService>;

  const mockAppointment: Appointment = {
    id: 1,
    client: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    } as Client,
    date: new Date(),
    time: '10:00',
    status: 'scheduled',
    notes: 'Test notes',
    appointmentServices: [],
  } as Appointment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AppointmentService),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Client),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    appointmentRepo = module.get<Repository<Appointment>>(
      getRepositoryToken(Appointment),
    );
    appointmentServiceRepo = module.get<Repository<AppointmentService>>(
      getRepositoryToken(AppointmentService),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all appointments', async () => {
      jest.spyOn(appointmentRepo, 'find').mockResolvedValue([mockAppointment]);
      const result = await service.findAll();
      expect(result).toEqual([mockAppointment]);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(appointmentRepo.find).toHaveBeenCalledWith({
        relations: [
          'client',
          'appointmentServices',
          'appointmentServices.service',
        ],
      });
    });
  });

  describe('findOne', () => {
    it('should return an appointment if found', async () => {
      jest.spyOn(appointmentRepo, 'findOne').mockResolvedValue(mockAppointment);
      const result = await service.findOne(1);
      expect(result).toEqual(mockAppointment);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(appointmentRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create an appointment with existing client', async () => {
      const dto: CreateAppointmentDto = {
        clientId: 1,
        date: '2023-10-01',
        time: '10:00',
        serviceIds: [1],
      };
      jest.spyOn(appointmentRepo, 'create').mockReturnValue(mockAppointment);
      jest.spyOn(appointmentRepo, 'save').mockResolvedValue(mockAppointment);
      jest.spyOn(appointmentServiceRepo, 'save').mockResolvedValue([] as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(mockAppointment);

      const result = await service.create(dto);
      expect(result).toEqual(mockAppointment);
    });

    it('should throw error if neither clientId nor client data is provided', async () => {
      const dto: Omit<CreateAppointmentDto, 'clientId' | 'client'> = {
        date: '2023-10-01',
        time: '10:00',
        serviceIds: [1],
      };
      await expect(service.create(dto)).rejects.toThrow(
        'Either clientId or client data must be provided',
      );
    });
  });

  describe('update', () => {
    it('should update an appointment', async () => {
      const dto: UpdateAppointmentDto = {
        date: '2023-10-01',
        time: '11:00',
        status: 'completed',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockAppointment);
      jest.spyOn(appointmentRepo, 'update').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      } as UpdateResult);
      const updatedAppointment = { ...mockAppointment, time: '11:00' };
      jest.spyOn(service, 'findOne').mockResolvedValue(updatedAppointment);

      const result = await service.update(1, dto);
      expect(result.time).toBe('11:00');
    });
  });

  describe('remove', () => {
    it('should remove an appointment', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockAppointment);
      jest.spyOn(appointmentServiceRepo, 'delete').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      } as DeleteResult);
      jest.spyOn(appointmentRepo, 'delete').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      } as DeleteResult);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });
});
