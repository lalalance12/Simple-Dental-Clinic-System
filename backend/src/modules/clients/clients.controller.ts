import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from '../../entities/client.entity';
import { CreateClientDto } from '../../dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findOne(+id);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }
}
