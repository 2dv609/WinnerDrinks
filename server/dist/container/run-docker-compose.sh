#!/bin/bash

docker-compose stop
docker-compose rm -vf
docker-compose up --build -d

#docker-compose up -d
