export class CreateAppointmentDto {
  clientId!: number;
  serviceIds!: number[];
  date!: Date;
  time!: string;
  status!: string;
  notes?: string;
}
