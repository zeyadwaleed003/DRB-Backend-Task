# DRB Internship – Backend Task

A small REST API for a Route Scheduling System.

## Tech Stack

![text](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![text](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![text](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![text](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![text](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![text](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7)

## Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run the app
npm run dev # development
# or
npm run build && npm start # production
```

## Assumptions made

- **Creating a new Route**: I assumed that I will be given the longitude and the latitute of the start and the end location, this would be beneficail to calculate the distance and the estimated time in my api (ofcourse this could be given by the client as well). To calculate the estimated time I assumed that the app is built for a small city which the average car speed is 50 km/h. I will be given the names of the start and the end location for more human readable info.

## Features Implemented

### 1. Create Route (POST `/routes`)

Creates a new route with automatic distance calculation and time estimation.

**Request Body:**

```json
{
  "startLocation": "Cairo",
  "endLocation": "Mansoura",
  "startLat": 30.0444,
  "startLong": 31.2357,
  "endLat": 31.0419,
  "endLong": 31.3785
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "id": "4gdf270b-e402-476l-93pb-ed1a50391mk3",
    "startLocation": "Cairo",
    "startLong": 31.2357,
    "startLat": 30.0444,
    "endLocation": "Mansoura",
    "endLong": 31.3785,
    "endLat": 31.0419,
    "distance": "111.7567667718332",
    "estimatedTime": 134,
    "status": "UNASSIGNED",
    "createdAt": "2025-09-24T08:33:01.893Z",
    "driverId": null
  }
}
```

The API automatically calculates the distance between coordinates and estimates travel time based on an average speed of 50 km/h.

### 2. Get Routes with Pagination (GET `/routes`)

Retrieves a paginated list of all routes with optional query parameters.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of routes per page (default: 100)

**Example Request:**

```
GET /api/v1/routes?page=1&limit=3
```

**Response:**

```json
{
  "status": "success",
  "size": 3,
  "data": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "startLocation": "Alexandria",
      "startLong": 29.9097,
      "startLat": 31.2001,
      "endLocation": "Giza",
      "endLong": 31.2497,
      "endLat": 30.0131,
      "distance": "215.8934567891234",
      "estimatedTime": 259,
      "status": "ASSIGNED",
      "createdAt": "2025-09-24T09:15:32.157Z",
      "driverId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    },
    {
      "id": "e58c4d2a-1b3f-4a5e-8f7d-9c6b5a4e3d2c",
      "startLocation": "Aswan",
      "startLong": 32.8998,
      "startLat": 24.0889,
      "endLocation": "Luxor",
      "endLong": 32.6396,
      "endLat": 25.6872,
      "distance": "185.4267891234567",
      "estimatedTime": 222,
      "status": "UNASSIGNED",
      "createdAt": "2025-09-24T10:22:18.945Z",
      "driverId": null
    },
    {
      "id": "b9a8c7d6-e5f4-3210-9876-543210fedcba",
      "startLocation": "Suez",
      "startLong": 32.5498,
      "startLat": 29.9668,
      "endLocation": "Port Said",
      "endLong": 32.3078,
      "endLat": 31.2653,
      "distance": "145.7823456789012",
      "estimatedTime": 175,
      "status": "ASSIGNED",
      "createdAt": "2025-09-24T11:08:47.623Z",
      "driverId": "z9y8x7w6-v5u4-t3s2-r1q0-p0o9n8m7l6k5"
    }
  ]
}
```

### 3. Create Driver (POST `/drivers`)

Creates a new driver with specified name and license type.

**Request Body:**

```json
{
  "name": "Ahmed Hassan",
  "licenseType": "B"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "id": "c8f7e6d5-4321-4b3a-9876-543210fedcba",
    "name": "Ahmed Hassan",
    "licenseType": "B",
    "availability": true,
    "createdAt": "2025-09-24T12:30:15.742Z",
    "updatedAt": "2025-09-24T12:30:15.742Z"
  }
}
```

Drivers are created with default availability set to `true` and can be assigned to routes based on their license type and availability status.

### 4. Automatic Route Assignment (Scheduled Job)

An automated background job that runs every 30 seconds to assign unassigned routes to available drivers.

**How it works:**

- Fetches all routes with status `UNASSIGNED`
- Fetches all drivers with `availability: true`
- Automatically assigns routes to drivers on a first come, first served basis
- Updates route status to `ASSIGNED` and sets the `driverId`
- Marks assigned drivers as unavailable (`availability: false`)

**Job Schedule:** Every 30 seconds (`*/30 * * * * *`)

**Example Assignment Process:**

```
Before Assignment:
Route ID: abc123 → Status: UNASSIGNED, driverId: null
Driver ID: def456 → availability: true

After Assignment:
Route ID: abc123 → Status: ASSIGNED, driverId: def456
Driver ID: def456 → availability: false
```

### 5. Get Driver Schedules (GET `/drivers/schedule`)

Retrieves all drivers and their assigned routes, showing the current scheduling status.

**Example Request:**

```
GET /api/v1/drivers/schedule
```

**Response:**

```json
{
  "status": "success",
  "size": 2,
  "data": [
    {
      "driverId": "a7b8c9d0-e1f2-3456-7890-abcdef123456",
      "name": "Mahmoud Salah",
      "route": [
        {
          "id": "route123-abc-def-456-789012345678",
          "startLocation": "Tanta",
          "startLong": 31.0004,
          "startLat": 30.7865,
          "endLocation": "Zagazig",
          "endLong": 31.5021,
          "endLat": 30.5877,
          "distance": "89.4523789012345",
          "estimatedTime": 107,
          "status": "ASSIGNED",
          "createdAt": "2025-09-24T14:20:30.125Z",
          "driverId": "a7b8c9d0-e1f2-3456-7890-abcdef123456"
        }
      ]
    },
    {
      "driverId": "b5c6d7e8-f9a0-1234-5678-90abcdef1234",
      "name": "Fatma Abdel Rahman",
      "route": [
        {
          "id": "route456-def-789-abc-123456789012",
          "startLocation": "Ismailia",
          "startLong": 32.2735,
          "startLat": 30.5965,
          "endLocation": "Suez",
          "endLong": 32.5498,
          "endLat": 29.9668,
          "distance": "75.6234567890123",
          "estimatedTime": 91,
          "status": "ASSIGNED",
          "createdAt": "2025-09-24T15:45:12.678Z",
          "driverId": "b5c6d7e8-f9a0-1234-5678-90abcdef1234"
        }
      ]
    }
  ]
}
```

### 6. Get Driver History (GET `/drivers/:driverId/history`)

Retrieves all completed routes for a specific driver, showing their trip history.

**Example Request:**

```
GET /api/v1/drivers/{c8f7e6d5-4321-4b3a-9876-543210fedcba}/history
```

**Response:**

```json
{
  "status": "success",
  "size": 2,
  "data": [
    {
      "id": "hist456-abc-789-def-123456789abc",
      "startLocation": "Minya",
      "startLong": 30.7327,
      "startLat": 28.0871,
      "endLocation": "Beni Suef",
      "endLong": 31.0948,
      "endLat": 29.0661,
      "distance": "125.8947234567890",
      "estimatedTime": 151,
      "status": "FINISHED",
      "createdAt": "2025-09-24T13:45:20.315Z",
      "driverId": "c8f7e6d5-4321-4b3a-9876-543210fedcba"
    },
    {
      "id": "hist789-def-012-ghi-456789012def",
      "startLocation": "Damietta",
      "startLong": 31.8133,
      "startLat": 31.4165,
      "endLocation": "Mansoura",
      "endLong": 31.3785,
      "endLat": 31.0419,
      "distance": "67.3421098765432",
      "estimatedTime": 81,
      "status": "FINISHED",
      "createdAt": "2025-09-24T11:20:45.782Z",
      "driverId": "c8f7e6d5-4321-4b3a-9876-543210fedcba"
    }
  ]
}
```

This endpoint displays all routes that have been previously assigned to the driver and completed.

### 7. Finish Trip (PATCH `/drivers/:driverId/finish-trip`)

Marks a driver's assigned route as completed and makes the driver available for new assignments.

**Example Request:**

```
PATCH /api/v1/drivers/c8f7e6d5-4321-4b3a-9876-543210fedcba/finish-trip
```

**Response:**

```json
{
  "status": "success",
  "message": "Trip finished successfully"
}
```

**What happens:**

- Updates the route status from `ASSIGNED` to `FINISHED`
- Sets the driver's availability back to `true`
- Makes the driver eligible for new route assignments in the next scheduling cycle
