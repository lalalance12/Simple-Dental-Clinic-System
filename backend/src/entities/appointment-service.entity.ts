import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Service } from './service.entity';

@Entity('appointment_services')
export class AppointmentService {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => Appointment,
    (appointment) => appointment.appointmentServices,
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment!: Appointment;

  @ManyToOne(() => Service, (service) => service.appointmentServices)
  @JoinColumn({ name: 'service_id' })
  service!: Service;
}
