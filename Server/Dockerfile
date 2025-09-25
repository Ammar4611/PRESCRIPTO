# Use an official Node runtime as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your server code
COPY . .

# Expose the port Back4App will use
ENV PORT=8080

# Start your app
CMD ["npm", "start"]
