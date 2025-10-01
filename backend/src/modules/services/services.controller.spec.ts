import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { CreateServiceDto } from '../../dto/create-service.dto';
import { Service } from '../../entities/service.entity';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  const mockService: Service = {
    id: 1,
    name: 'Teeth Cleaning',
    description: 'Professional teeth cleaning',
    price: 100,
    duration: '30 min',
    appointmentServices: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all services', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockService]);
      const result = await controller.findAll();
      expect(result).toEqual([mockService]);
    });
  });

  describe('findOne', () => {
    it('should return one service', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockService);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockService);
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
      jest.spyOn(service, 'create').mockResolvedValue(mockService);
      const result = await controller.create(dto);
      expect(result).toEqual(mockService);
    });
  });
});
