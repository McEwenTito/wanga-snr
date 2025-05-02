# Job Board Application

A full-stack job board application built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- Job listing with search, filter, and sort functionality
- Job details view
- Create new job listings
- Responsive design
- Type-safe API with TypeScript
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18 or later
- npm or yarn
- PostgreSQL 15 or later (for non-Docker setup)
- Docker and Docker Compose (for Docker setup)

## Project Structure

```
.
├── frontend/           # Next.js frontend application
├── backend/           # Next.js backend API
└── docker-compose.yml # Docker Compose configuration
```

## Setup with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd job-board
   ```

2. Start all services:
   ```bash
   docker-compose up --build
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:8000
   - PostgreSQL database

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Setup without Docker

### Database Setup

1. Create a PostgreSQL database:
   ```bash
   createdb jobs_db
   ```

2. Set up environment variables for the backend:
   ```bash
   cd backend
   cp .env.example .env
   ```

   Update the `.env` file with your database credentials:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/jobs_db"
   NODE_ENV=development
   PORT=8000
   ```

### Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

3. Seed the database:
   ```bash
   npx prisma db seed
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Development

### Running Tests

#### Backend Tests
```bash
cd backend
npm test
```

#### Frontend Tests
```bash
cd frontend
npm test
```

### Database Migrations

To create a new migration:
```bash
cd backend
npx prisma migrate dev --name <migration-name>
```

### Environment Variables

#### Backend (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/jobs_db"
NODE_ENV=development
PORT=8000
```

#### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Endpoints

### Jobs
- `GET /api/jobs` - List jobs with pagination, search, and filters
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/[id]` - Get job details
- `PUT /api/jobs/[id]` - Update a job
- `DELETE /api/jobs/[id]` - Delete a job

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 