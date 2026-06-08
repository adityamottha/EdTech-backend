# Use official Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Install nodemon for development (will be overridden in production)
RUN npm install -g nodemon

# Expose the port your app runs on
EXPOSE 5000

# Command to run the app
CMD ["npm", "run", "dev"]