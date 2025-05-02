#!/bin/bash

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL is ready!"

# Clean up any existing Prisma client
echo "Cleaning up existing Prisma client..."
rm -rf node_modules/.prisma

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Reset the database and apply migrations
echo "Resetting database and applying migrations..."
npx prisma migrate reset --force

# Seed the database
echo "Seeding the database..."
npx prisma db seed

# Start the application
echo "Starting the application..."
npm start 