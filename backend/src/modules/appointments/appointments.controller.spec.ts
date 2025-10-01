import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../../dto/update-appointment.dto';
import { Appointment } from '../../entities/appointment.entity';
import { Client } from 'src/entities/client.entity';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  const mockAppointment = {
    id: 1,
    date: new Date(),
    time: '10:00',
    status: 'scheduled',
    notes: 'Test notes',
    client: {
      id: 1,
    } as Client,
  } as Appointment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        {
          provide: AppointmentsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all appointments', async function (this: void) {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockAppointment]);
      const result = await controller.findAll();
      expect(result).toEqual([mockAppointment]);
    });
  });

  describe('findOne', () => {
    it('should return one appointment', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockAppointment);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockAppointment);
    });
  });

  describe('create', () => {
    it('should create an appointment', async () => {
      const dto: CreateAppointmentDto = {
        clientId: 1,
        date: '2023-10-01',
        time: '10:00',
        serviceIds: [1],
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockAppointment);
      const result = await controller.create(dto);
      expect(result).toEqual(mockAppointment);
    });
  });

  describe('update', () => {
    it('should update an appointment', async () => {
      const dto: UpdateAppointmentDto = {
        date: '2023-10-01',
        time: '11:00',
        status: 'scheduled',
      };
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...mockAppointment, time: '11:00' });
      const result = await controller.update('1', dto);
      expect(result.time).toBe('11:00');
    });
  });

  describe('remove', () => {
    it('should remove an appointment', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await expect(controller.remove('1')).resolves.toBeUndefined();
    });
  });
});
