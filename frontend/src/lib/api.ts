// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Types for API responses
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration?: string;
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
}

export interface Appointment {
  id: number;
  date: Date;
  time: string;
  status: string;
  notes?: string;
  client: Client;
  appointmentServices: Array<{
    id: number;
    service: Service;
  }>;
}

// API functions
export const api = {
  // Fetch all services
  async getServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    return response.json();
  },

  // Fetch all appointments
  async getAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    return response.json();
  },

  // Fetch all clients
  async getClients(): Promise<Client[]> {
    const response = await fetch(`${API_BASE_URL}/clients`);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    return response.json();
  },

  // Create an appointment (unified - handles both new and existing clients)
  async createAppointment(appointmentData: {
    // Either clientId (for existing client) OR client data (for new client)
    clientId?: number;
    client?: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth?: string;
      address?: string;
      emergencyContact?: string;
      medicalHistory?: string;
    };
    serviceIds: number[];
    date: string;
    time: string;
    status?: string;
    notes?: string;
  }): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create appointment');
    }

    return response.json();
  },

  // Delete an appointment
  async deleteAppointment(appointmentId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete appointment');
    }
  },
};

