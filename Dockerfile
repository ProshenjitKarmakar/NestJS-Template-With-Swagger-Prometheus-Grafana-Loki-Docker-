# Use the official Node.js image with Alpine Linux
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port
EXPOSE 7001

# Command to run the application in development mode
CMD ["npm", "run", "start:dev"]
