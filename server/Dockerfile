# Use Node.js v14 as base image
FROM node:14

# Create app directory
WORKDIR /socialpedia

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
