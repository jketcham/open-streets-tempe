# Base image
FROM node:20-alpine as builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci

# Copy application files
COPY . .

# Build Remix app
RUN npm run build

# Production image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy server file and other necessary files
COPY server.js ./
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/public ./public

# Expose Remix's port
EXPOSE 3000

# Start the Remix app
CMD ["npm", "start"]
