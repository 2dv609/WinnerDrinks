#!/bin/bash

# Start application for production.

docker network create -d bridge --subnet 10.0.2.0/24 winner-drinks-net
docker-compose -f /var/www/winner-drinks/docker-compose.yaml down --volumes
docker volume rm winner-drinks-data
docker volume create --name=winner-drinks-data
docker-compose -f /var/www/winner-drinks/docker-compose.yaml up --build -d
