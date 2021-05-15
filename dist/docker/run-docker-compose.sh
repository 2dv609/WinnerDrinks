#!/bin/bash

docker network create -d bridge --subnet 10.0.2.0/24 winner-drinks-net
docker-compose down --volumes
docker volume create --name=winner-drinks-data
docker-compose up -d
