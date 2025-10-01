export class UpdateAppointmentDto {
  date!: string;
  time!: string;
  status!: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  serviceIds?: number[];

  constructor(data?: Partial<UpdateAppointmentDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
