import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesService } from './services.service';
import { Service } from '../../entities/service.entity';
import { CreateServiceDto } from '../../dto/create-service.dto';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let serviceRepo: Repository<Service>;

  const mockService: Service = {
    id: 1,
    name: 'Teeth Cleaning',
    description: 'Professional teeth cleaning',
    price: 100,
    duration: '30 min',
    appointmentServices: [],
  } as Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    serviceRepo = module.get<Repository<Service>>(getRepositoryToken(Service));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all services', async () => {
      jest.spyOn(serviceRepo, 'find').mockResolvedValue([mockService]);
      const result = await service.findAll();
      expect(result).toEqual([mockService]);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(serviceRepo.find).toHaveBeenCalledWith({
        relations: ['appointmentServices'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a service if found', async () => {
      jest.spyOn(serviceRepo, 'findOne').mockResolvedValue(mockService);
      const result = await service.findOne(1);
      expect(result).toEqual(mockService);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(serviceRepo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a service', async () => {
      const dto: CreateServiceDto = {
        name: 'Teeth Cleaning',
        description: 'Professional teeth cleaning',
        price: 100,
        duration: '30 min',
      };
      jest.spyOn(serviceRepo, 'create').mockReturnValue(mockService);
      jest.spyOn(serviceRepo, 'save').mockResolvedValue(mockService);

      const result = await service.create(dto);
      expect(result).toEqual(mockService);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(serviceRepo.create).toHaveBeenCalledWith(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(serviceRepo.save).toHaveBeenCalledWith(mockService);
    });
  });
});
