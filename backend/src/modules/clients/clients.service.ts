import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { CreateClientDto } from '../../dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find({ relations: ['appointments'] });
  }

  findOne(id: number): Promise<Client> {
    return this.clientsRepository.findOne({
      where: { id },
      relations: ['appointments'],
    });
  }

  create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(client);
  }
}
