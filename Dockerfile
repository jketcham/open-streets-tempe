# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build Remix app
RUN npm run build

# Expose Remix's port
EXPOSE 3000

# Start the Remix app
CMD ["npm", "start"]
