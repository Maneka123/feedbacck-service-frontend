# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend source code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the frontend
CMD ["npm", "run", "dev"]