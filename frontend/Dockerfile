# Use Node.js 20 for better compatibility with Vite 7
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove package-lock.json and node_modules if they exist
RUN rm -rf package-lock.json node_modules

# Install dependencies with legacy peer deps to avoid conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve to run the built application
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"] 