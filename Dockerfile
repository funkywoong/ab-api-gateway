#!/bin/bash

FROM node:10

# Create working directory
WORKDIR /usr/app

# Copy for installing node package
COPY package*.json ./

# Install node modules
RUN npm install

# Add application source code
COPY . .

# Execute node app
CMD ["npm", "run", "dev"]