import { CreateClientDto } from './create-client.dto';

export class CreateBookingDto {
  // Client information
  client!: CreateClientDto;

  // Appointment information
  serviceIds!: number[];
  date!: string; // ISO date string
  time!: string;
  notes?: string;

  // Payment information (for future use)
  paymentMethod?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  billingAddress?: string;
}
