#!/bin/bash

# Load database and start application in local production

# Server
export PORT=4000
export MONGO_USERNAME=admin
export MONGO_PASSWORD=admin
export MONGO_HOST=localhost
export MONGO_PORT=27017
export MONGO_DB=winner_drinks
export NODE_ENV=production

npm ci --production
docker-compose -f container/docker-compose.yaml down
docker-compose -f container/docker-compose.yaml up --build -d
node server/server.js
