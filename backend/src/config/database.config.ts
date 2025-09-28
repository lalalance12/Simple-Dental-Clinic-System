import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentService } from '../entities/appointment-service.entity';
import { Client } from '../entities/client.entity';
import { Service } from '../entities/service.entity';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'password'),
  database: configService.get<string>('DB_DATABASE', 'dental_clinic'),
  entities: [Appointment, AppointmentService, Client, Service],
  synchronize: true, // Set to false in production
});
