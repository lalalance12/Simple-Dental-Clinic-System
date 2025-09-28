import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServicesService } from './modules/services/services.service';
import { CreateServiceDto } from './dto/create-service.dto';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const servicesService = app.get(ServicesService);

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

  console.log('Seeding completed!');
  await app.close();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
