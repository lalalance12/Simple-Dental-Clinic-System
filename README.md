# 🦷 Simple Dental Clinic System

A comprehensive dental clinic management system that allows patients to book appointments and administrators to manage clients, appointments, and services.

## ✨ Features

- **Patient Portal**: Book appointments online
- **Admin Dashboard**: Manage clients, appointments, and services
- **Appointment Management**: Schedule, update, and cancel appointments
- **Client Management**: Maintain patient records and information
- **Service Management**: Define available dental services with pricing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Architecture**: Modular MVC pattern

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Development Tools
- **Testing**: Jest
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Process Management**: Concurrently

## 📁 Project Structure

```
simple-dental-clinic-system/
├── backend/                          # NestJS API Server
│   ├── src/
│   │   ├── config/
│   │   │   └── database.config.ts    # Database configuration
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── create-appointment.dto.ts
│   │   │   ├── create-client.dto.ts
│   │   │   ├── create-service.dto.ts
│   │   │   └── update-appointment.dto.ts
│   │   ├── entities/                 # TypeORM Entities
│   │   │   ├── appointment.entity.ts
│   │   │   ├── appointment-service.entity.ts
│   │   │   ├── client.entity.ts
│   │   │   └── service.entity.ts
│   │   ├── modules/                  # Feature Modules
│   │   │   ├── appointments/
│   │   │   │   ├── appointments.controller.ts
│   │   │   │   ├── appointments.service.ts
│   │   │   │   ├── appointments.module.ts
│   │   │   │   └── *.spec.ts         # Unit tests
│   │   │   ├── clients/
│   │   │   │   ├── clients.controller.ts
│   │   │   │   ├── clients.service.ts
│   │   │   │   ├── clients.module.ts
│   │   │   │   └── *.spec.ts
│   │   │   └── services/
│   │   │       ├── services.controller.ts
│   │   │       ├── services.service.ts
│   │   │       ├── services.module.ts
│   │   │       └── *.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts                   # Application entry point
│   │   └── seed.ts                   # Database seeding
│   └── package.json
├── frontend/                         # Next.js Client Application
│   ├── src/
│   │   ├── app/                      # Next.js App Router
│   │   │   ├── admin/                # Admin pages
│   │   │   │   ├── page.tsx
│   │   │   │   ├── add-appointment/
│   │   │   │   └── components/       # Admin components
│   │   │   ├── book-appointment/     # Appointment booking
│   │   │   ├── services/             # Services page
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   └── ui/                   # Reusable UI components
│   │   └── lib/
│   │       └── api.ts                # API client
│   └── package.json
├── package.json                      # Root package.json
└── README.md
```

## 🗄️ Database Schema (ERD)

```
┌─────────────────┐       ┌─────────────────┐
│     Client      │       │   Appointment   │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──────►│ id (PK)         │
│ firstName       │  1..* │ date            │
│ lastName        │       │ time            │
│ email           │       │ status          │
│ phone           │       │ notes           │
│ dateOfBirth     │       │ client_id (FK)  │
│ address         │       └─────────────────┘
│ emergencyContact│               │
│ medicalHistory  │               │
└─────────────────┘               │
                                  │ 1..*
                                  │
                                  │
                                  ▼
                        ┌──────────────────┐
                        │     Service      │
                        ├──────────────────┤
                        │ id (PK)          │
                        │ name             │
                        │ description      │
                        │ price            │
                        │ duration         │
                        └──────────────────┘
```

### Relationships:
- **Client ↔ Appointment**: One-to-Many (One client can have multiple appointments)
- **Appointment ↔ Service**: Many-to-Many (One appointment can have multiple services, one service can be used in multiple appointments)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/simple-dental-clinic-system.git
   cd simple-dental-clinic-system
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   This command installs dependencies for the root, frontend, and backend.

### Database Setup

1. **Create a PostgreSQL database**
   ```sql
   CREATE DATABASE dental_clinic;
   ```

2. **Configure database connection**
   Update the database configuration in `backend/src/config/database.config.ts`:
   ```typescript
   export const databaseConfig = {
     type: 'postgres' as const,
     host: 'localhost',
     port: 5432,
     username: 'your_username',
     password: 'your_password',
     database: 'dental_clinic',
   };
   ```

3. **Run database migrations/seeding**
   ```bash
   cd backend
   npm run seed
   ```

## 🏃 Running the Application

### Development Mode

You have two options to run the application during development:

#### Option 1: Run Everything from Root Level (Recommended)
```bash
npm run dev
```
This single command runs both backend and frontend simultaneously:
- **Backend**: http://localhost:3001 (NestJS API)
- **Frontend**: http://localhost:3000 (Next.js app)

#### Option 2: Run in Separate Terminals
For more control and better debugging experience, run backend and frontend in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

## 📡 API Endpoints

### Clients
- `GET /clients` - Get all clients
- `GET /clients/:id` - Get client by ID
- `POST /clients` - Create new client

### Appointments
- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get appointment by ID
- `POST /appointments` - Create new appointment
- `PATCH /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment

### Services
- `GET /services` - Get all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Create new service

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test                    # Run all tests
npm run test:watch             # Run tests in watch mode
npm run test:cov               # Run tests with coverage
npm run test:e2e               # Run end-to-end tests
```

## 🔧 Development Scripts

### Root Level
- `npm run install:all` - Install all dependencies
- `npm run dev` - Start both frontend and backend simultaneously (recommended)
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only

### Backend Scripts
- `npm run start:dev` - Development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Frontend Scripts
- `npm run dev` - Development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

**Built using NestJS, Next.js, and PostgreSQL**
