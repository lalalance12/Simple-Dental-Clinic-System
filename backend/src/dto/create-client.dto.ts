export class CreateClientDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
}
