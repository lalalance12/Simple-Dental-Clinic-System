import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth!: Date;

  @Column({ type: 'text', nullable: true })
  address!: string;

  @Column({ nullable: true })
  emergencyContact!: string;

  @Column({ type: 'text', nullable: true })
  medicalHistory!: string;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments!: Appointment[];
}
