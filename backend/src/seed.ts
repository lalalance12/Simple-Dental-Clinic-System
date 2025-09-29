import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServicesService } from './modules/services/services.service';
import { ClientsService } from './modules/clients/clients.service';
import { AppointmentsService } from './modules/appointments/appointments.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Client } from './entities/client.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const servicesService = app.get(ServicesService);
  const clientsService = app.get(ClientsService);
  const appointmentsService = app.get(AppointmentsService);

  const services: CreateServiceDto[] = [
    {
      name: 'Regular Checkup',
      description: 'Comprehensive dental examination and cleaning',
      price: 1800,
      duration: '45-60 min',
    },
    {
      name: 'Deep Cleaning',
      description: 'Professional dental cleaning and scaling',
      price: 5600,
      duration: '60-90 min',
    },
    {
      name: 'Teeth Whitening',
      description: 'Professional teeth whitening treatment',
      price: 8700,
      duration: '30-60 min',
    },
    {
      name: 'Dental Implant',
      description: 'Single tooth implant replacement',
      price: 70000,
      duration: '2-6 months',
    },
    {
      name: 'Tooth Extraction',
      description: 'Safe removal of damaged or decayed teeth',
      price: 5000,
      duration: '30-45 min',
    },
    {
      name: 'Emergency Care',
      description: 'Emergency dental treatment and pain relief',
      price: 8000,
      duration: 'Varies',
    },
  ];

  const clients: CreateClientDto[] = [
    {
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      email: 'juan.delacruz@email.com',
      phone: '+63-917-123-4567',
      dateOfBirth: new Date('1985-03-15'),
      address: '123 Rizal Avenue, Barangay 1, Manila',
      emergencyContact: 'Maria Dela Cruz +63-917-123-4568',
    },
    {
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria.santos@email.com',
      phone: '+63-927-234-5678',
      dateOfBirth: new Date('1990-07-22'),
      address: '456 Bonifacio Street, Barangay 2, Quezon City',
    },
    {
      firstName: 'Antonio',
      lastName: 'Garcia',
      email: 'antonio.garcia@email.com',
      phone: '+63-937-345-6789',
      dateOfBirth: new Date('1978-11-08'),
      address: '789 Mabini Road, Barangay 3, Cebu City',
      emergencyContact: 'Elena Garcia +63-937-345-6790',
      medicalHistory: 'Allergic to penicillin',
    },
    {
      firstName: 'Cristina',
      lastName: 'Reyes',
      email: 'cristina.reyes@email.com',
      phone: '+63-947-456-7890',
      dateOfBirth: new Date('1995-01-30'),
    },
    {
      firstName: 'Roberto',
      lastName: 'Mendoza',
      email: 'roberto.mendoza@email.com',
      phone: '+63-957-567-8901',
      dateOfBirth: new Date('1982-09-12'),
      address: '321 Aguinaldo Boulevard, Barangay 4, Davao City',
    },
    {
      firstName: 'Luzviminda',
      lastName: 'Torres',
      email: 'luz.torres@email.com',
      phone: '+63-967-678-9012',
      dateOfBirth: new Date('1988-05-18'),
      address: '654 Osmena Street, Barangay 5, Makati City',
      medicalHistory: 'Diabetic',
    },
    {
      firstName: 'Fernando',
      lastName: 'Villanueva',
      email: 'fernando.v@email.com',
      phone: '+63-977-789-0123',
      dateOfBirth: new Date('1975-12-03'),
    },
    {
      firstName: 'Jennifer',
      lastName: 'Aquino',
      email: 'jennifer.aquino@email.com',
      phone: '+63-987-890-1234',
      dateOfBirth: new Date('1992-04-25'),
      address: '987 Laurel Avenue, Barangay 6, Pasig City',
      emergencyContact: 'Mark Aquino +63-987-890-1235',
    },
    {
      firstName: 'Jose',
      lastName: 'Rodriguez',
      email: 'jose.rodriguez@email.com',
      phone: '+63-997-901-2345',
      dateOfBirth: new Date('1980-08-14'),
    },
    {
      firstName: 'Rosario',
      lastName: 'Castro',
      email: 'rosario.c@email.com',
      phone: '+63-907-012-3456',
      dateOfBirth: new Date('1987-02-28'),
      address: '147 Roxas Boulevard, Barangay 7, Bacolod City',
      medicalHistory: 'Hypertension',
    },
    {
      firstName: 'Carlos',
      lastName: 'Fernandez',
      email: 'carlos.fernandez@email.com',
      phone: '+63-917-123-4569',
      dateOfBirth: new Date('1993-06-10'),
    },
    {
      firstName: 'Angelica',
      lastName: 'Morales',
      email: 'angelica.morales@email.com',
      phone: '+63-927-234-5679',
      dateOfBirth: new Date('1984-10-05'),
      address: '258 Quezon Avenue, Barangay 8, Iloilo City',
    },
    {
      firstName: 'Ricardo',
      lastName: 'Santiago',
      email: 'ricardo.santiago@email.com',
      phone: '+63-937-345-6780',
      dateOfBirth: new Date('1979-03-20'),
      emergencyContact: 'Carmen Santiago +63-937-345-6781',
    },
  ];

  const appointments: Omit<CreateAppointmentDto, 'clientId'>[] = [
    {
      serviceIds: [1], // Regular Checkup
      date: '2025-10-05',
      time: '09:00',
      status: 'completed',
      notes: 'Regular maintenance checkup',
    },
    {
      serviceIds: [2], // Deep Cleaning
      date: '2025-10-07',
      time: '14:00',
      status: 'completed',
    },
    {
      serviceIds: [1, 3], // Regular Checkup + Teeth Whitening
      date: '2025-10-10',
      time: '10:30',
      status: 'scheduled',
    },
    {
      serviceIds: [5], // Tooth Extraction
      date: '2025-10-12',
      time: '11:00',
      status: 'scheduled',
      notes: 'Wisdom tooth extraction',
    },
    {
      serviceIds: [1], // Regular Checkup
      date: '2025-10-15',
      time: '13:00',
      status: 'scheduled',
    },
    {
      serviceIds: [3], // Teeth Whitening
      date: '2025-10-18',
      time: '15:30',
      status: 'scheduled',
    },
    {
      serviceIds: [2], // Deep Cleaning
      date: '2025-10-20',
      time: '09:30',
      status: 'scheduled',
    },
    {
      serviceIds: [1], // Regular Checkup
      date: '2025-10-22',
      time: '16:00',
      status: 'scheduled',
    },
    {
      serviceIds: [6], // Emergency Care
      date: '2025-09-25',
      time: '08:00',
      status: 'completed',
      notes: 'Severe tooth pain - emergency treatment',
    },
    {
      serviceIds: [4], // Dental Implant
      date: '2025-11-01',
      time: '10:00',
      status: 'scheduled',
      notes: 'Initial consultation for implant',
    },
    {
      serviceIds: [1, 2], // Regular Checkup + Deep Cleaning
      date: '2025-10-25',
      time: '11:30',
      status: 'scheduled',
    },
    {
      serviceIds: [3], // Teeth Whitening
      date: '2025-10-28',
      time: '14:30',
      status: 'scheduled',
    },
    {
      serviceIds: [1], // Regular Checkup
      date: '2025-11-05',
      time: '09:00',
      status: 'scheduled',
    },
    {
      serviceIds: [5], // Tooth Extraction
      date: '2025-11-08',
      time: '13:30',
      status: 'scheduled',
    },
    {
      serviceIds: [2], // Deep Cleaning
      date: '2025-11-12',
      time: '10:00',
      status: 'scheduled',
    },
    {
      serviceIds: [1], // Regular Checkup
      date: '2025-11-15',
      time: '15:00',
      status: 'scheduled',
    },
    {
      serviceIds: [3, 1], // Teeth Whitening + Regular Checkup
      date: '2025-11-18',
      time: '11:00',
      status: 'scheduled',
    },
    {
      serviceIds: [6], // Emergency Care
      date: '2025-11-20',
      time: '16:30',
      status: 'scheduled',
      notes: 'Follow-up emergency visit',
    },
  ];

  console.log('Seeding dental services...');

  for (const serviceData of services) {
    try {
      // Check if service already exists
      const existingServices = await servicesService.findAll();
      const exists = existingServices.some((s) => s.name === serviceData.name);

      if (!exists) {
        const service = await servicesService.create(serviceData);
        console.log(`Created service: ${service.name}`);
      } else {
        console.log(`Service already exists: ${serviceData.name}`);
      }
    } catch (error) {
      console.error(`Error creating service ${serviceData.name}:`, error);
    }
  }

  console.log('Seeding clients...');

  const createdClients: Client[] = [];
  for (const clientData of clients) {
    try {
      // Check if client already exists
      const existingClients = await clientsService.findAll();
      const exists = existingClients.some((c) => c.email === clientData.email);

      if (!exists) {
        const client = await clientsService.create(clientData);
        createdClients.push(client);
        console.log(`Created client: ${client.firstName} ${client.lastName}`);
      } else {
        console.log(
          `Client already exists: ${clientData.firstName} ${clientData.lastName}`,
        );
        const existingClient = existingClients.find(
          (c) => c.email === clientData.email,
        );
        if (existingClient) {
          createdClients.push(existingClient);
        }
      }
    } catch (error) {
      console.error(
        `Error creating client ${clientData.firstName} ${clientData.lastName}:`,
        error,
      );
    }
  }

  console.log('Seeding appointments...');

  for (let i = 0; i < appointments.length; i++) {
    try {
      const appointmentData = appointments[i];
      const clientIndex = i % createdClients.length; // Distribute appointments among clients
      const client = createdClients[clientIndex];

      const appointmentWithClient: CreateAppointmentDto = {
        ...appointmentData,
        clientId: client.id,
      };

      const appointment = await appointmentsService.create(
        appointmentWithClient,
      );
      console.log(
        `Created appointment for ${client.firstName} ${client.lastName} on ${
          appointment.date.toISOString().split('T')[0]
        } at ${appointment.time}`,
      );
    } catch (error) {
      console.error(`Error creating appointment ${i + 1}:`, error);
    }
  }

  console.log('Seeding completed!');
  await app.close();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
