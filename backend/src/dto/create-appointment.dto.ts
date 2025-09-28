import { CreateClientDto } from './create-client.dto';

export class CreateAppointmentDto {
  // Either provide existing client ID (for admin bookings)
  clientId?: number;

  // OR provide new client data (for patient bookings)
  client?: CreateClientDto;

  // Required appointment details
  serviceIds!: number[];
  date!: string; // ISO date string
  time!: string;
  status?: string; // defaults to 'scheduled'
  notes?: string;
}
