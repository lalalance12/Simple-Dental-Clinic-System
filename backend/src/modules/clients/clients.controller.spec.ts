import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from '../../dto/create-client.dto';
import { Client } from '../../entities/client.entity';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  const mockClient: Client = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    dateOfBirth: new Date('1990-01-01'),
    address: '123 Main St',
    emergencyContact: 'Jane Doe',
    medicalHistory: 'None',
    appointments: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockClient]);
      const result = await controller.findAll();
      expect(result).toEqual([mockClient]);
    });
  });

  describe('findOne', () => {
    it('should return one client', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockClient);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockClient);
    });
  });

  describe('create', () => {
    it('should create a client', async () => {
      const dto: CreateClientDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockClient);
      const result = await controller.create(dto);
      expect(result).toEqual(mockClient);
    });
  });
});
