# BizDesk Backend

Multi-tenant SaaS backend for service businesses (salons, clinics, gyms, consultants, coaching institutes).

## Features

- Business onboarding with owner account creation
- Tenant-isolated JWT authentication
- Staff management
- Customer management
- Service catalog management
- Appointment scheduling with conflict checks
- Subscription state management
- Dashboard analytics overview

## Setup

1. Install dependencies:
   - `npm install`
2. Create env file:
   - copy `backend/.env.example` to `backend/.env`
3. Run backend:
   - `npm run dev`

## API Base

- `http://localhost:5000/api`

## Core Endpoints

- `POST /api/auth/register-business`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST /api/staff`
- `PATCH|DELETE /api/staff/:staffId`
- `GET|POST /api/customers`
- `PATCH|DELETE /api/customers/:customerId`
- `GET|POST /api/services`
- `PATCH|DELETE /api/services/:serviceId`
- `GET|POST /api/appointments`
- `PATCH /api/appointments/:appointmentId/status`
- `PATCH /api/appointments/:appointmentId/reschedule`
- `GET /api/subscription`
- `PUT /api/subscription`
- `GET /api/dashboard/overview`

## Multi-Tenancy

- All business data uses a `business` reference field.
- Auth token includes `businessId`.
- Protected controllers scope every query using `req.user.businessId`.
