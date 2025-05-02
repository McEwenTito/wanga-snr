FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install netcat for database connection check
RUN apk add --no-cache netcat-openbsd

# Copy source code
COPY . .

# Make the init script executable
RUN chmod +x scripts/init-db.sh

# Build the application
RUN npm run build

# Expose port
EXPOSE 8000

# Start the application using the init script
CMD ["./scripts/init-db.sh"] 