import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AppointmentService } from './appointment-service.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal')
  price!: number;

  @Column({ nullable: true })
  duration!: string;

  @OneToMany(
    () => AppointmentService,
    (appointmentService) => appointmentService.service,
  )
  appointmentServices!: AppointmentService[];
}
