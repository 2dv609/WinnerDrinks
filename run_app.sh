#!/bin/bash

# Run application at once
# OBS! Typescript must be installed globally and also docker and docker compose must be installed

# Install packages on server
D1=server/node_modules
if [ ! -d "$D1" ]; then
    npm ci --prefix server
fi

# Install packages on client
D2=client/node_modules
if [ ! -d "$D2" ]; then
    npm ci --prefix client
fi

# Copy standard values for env
F1=server/.env
if [ ! -f "$F1" ]; then
    cp server/.env.example server/.env
fi


docker-compose -f server/container/docker-compose.yaml down
docker-compose -f server/container/docker-compose.yaml up --buil -d & 
npm run start:dev:init --prefix server & 
npm run start --prefix client


