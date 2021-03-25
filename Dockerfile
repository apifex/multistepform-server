#  Dockerfile for Node Express Backend

FROM node:lts-buster-slim

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
# COPY package.json /usr/src/app
# COPY package-lock.json /usr/src/app


RUN npm ci

# Copy app source code
# COPY . .
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]