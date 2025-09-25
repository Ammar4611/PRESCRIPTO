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

# Set the environment port variable (Back4App uses 8080)
ENV PORT=8080

# Tell Docker what port the app listens on
EXPOSE 8080

# Start your app
CMD ["npm", "start"]
