#!/bin/bash

docker-compose down --volumes
docker volume create --name=winner-drinks-data
docker-compose up -d
