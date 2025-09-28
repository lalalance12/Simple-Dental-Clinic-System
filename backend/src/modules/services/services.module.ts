import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service } from '../../entities/service.entity';
import { AppointmentService } from '../../entities/appointment-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, AppointmentService])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
