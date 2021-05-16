#!/bin/bash

# Start application for production or local production.

docker network create -d bridge --subnet 10.0.2.0/24 winner-drinks-net
docker-compose -f docker/docker-compose.yaml down --volumes
docker volume create --name=winner-drinks-data
docker-compose -f docker/docker-compose.yaml up -d mongodb
