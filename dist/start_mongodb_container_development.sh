#!/bin/bash

# Start application for local development.

# Directory of script file (even if called from another directory)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

docker network create -d bridge --subnet 10.0.2.0/24 winner-drinks-net
docker-compose -f $SCRIPT_DIR/docker/docker-compose.yaml down --volumes
docker volume rm winner-drinks-data
docker volume create --name=winner-drinks-data
docker-compose -f $SCRIPT_DIR/docker/docker-compose.yaml up --build -d mongodb
