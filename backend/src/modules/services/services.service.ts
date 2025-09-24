import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../entities/service.entity';
import { CreateServiceDto } from '../../dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find({ relations: ['appointments'] });
  }

  findOne(id: number): Promise<Service> {
    return this.servicesRepository.findOne({
      where: { id },
      relations: ['appointments'],
    });
  }

  create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(createServiceDto);
    return this.servicesRepository.save(service);
  }
}
