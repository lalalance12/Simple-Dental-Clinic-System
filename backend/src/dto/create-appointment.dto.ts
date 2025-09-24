export class CreateAppointmentDto {
  clientId: number;
  serviceId: number;
  date: Date;
  time: string;
  status: string;
}
