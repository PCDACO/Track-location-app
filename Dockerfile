# Use Node.js LTS version
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    bash \
    curl \
    openssh-client

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Expo uses
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

# Start the development server
CMD ["npm", "start"] 