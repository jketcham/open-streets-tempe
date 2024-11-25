# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build Remix app
RUN npm run build

# Expose Remix's port
EXPOSE 3000

# Start the Remix app
CMD ["npm", "start"]
