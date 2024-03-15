# Management System Project Setup

This guide will walk you through setting up the Management System project on your local machine.

## Clone the Repository

```bash
git clone <repository-url>
```

## Setting Up Backend

1. Navigate to the backend directory:
   ```bash
   cd management-system-backend
   ```

2. Create a `.env` file in the root directory and configure your PostgreSQL database connection.

3. Apply database migrations:
   ```bash
   cd prisma
   npx prisma migrate dev
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Seed the database:
   ```bash
   tsc seed.ts
   node seed.js
   ```

6. Return to the root directory:
   ```bash
   cd ..
   ```

7. Start the backend server in development mode:
   ```bash
   npm run start:dev
   ```

## Setting Up Frontend

1. Navigate to the frontend directory:
   ```bash
   cd management-system-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Accessing the Application

Once both the backend and frontend servers are running, you can access the Management System application by opening your browser and visiting [http://localhost:3000](http://localhost:5173/)

That's it! You've successfully set up the Management System project on your local machine.
