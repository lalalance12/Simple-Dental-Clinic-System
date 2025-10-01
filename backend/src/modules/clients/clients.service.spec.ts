import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { Client } from '../../entities/client.entity';
import { CreateClientDto } from '../../dto/create-client.dto';
import { NotFoundException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let clientRepo: Repository<Client>;

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
  } as Client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    clientRepo = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      jest.spyOn(clientRepo, 'find').mockResolvedValue([mockClient]);
      const result = await service.findAll();
      expect(result).toEqual([mockClient]);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(clientRepo.find).toHaveBeenCalledWith({
        relations: ['appointments'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a client if found', async () => {
      jest.spyOn(clientRepo, 'findOne').mockResolvedValue(mockClient);
      const result = await service.findOne(1);
      expect(result).toEqual(mockClient);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(clientRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a client', async () => {
      const dto: CreateClientDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        dateOfBirth: new Date('1990-01-01'),
        address: '123 Main St',
        emergencyContact: 'Jane Doe',
        medicalHistory: 'None',
      };
      jest.spyOn(clientRepo, 'create').mockReturnValue(mockClient);
      jest.spyOn(clientRepo, 'save').mockResolvedValue(mockClient);

      const result = await service.create(dto);
      expect(result).toEqual(mockClient);
    });
  });
});
