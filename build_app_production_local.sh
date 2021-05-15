#!/bin/bash

# Build application for local production
# Use this script if you want to test service workers and indexedDB on local machine.


# Check if client/.env exists if not abort
F1=client/.env
if [ ! -f "$F1" ]; then
    echo "File client/.env is missing"
    exit 1
fi


# Install npm packages on server for production
D0=node_modules
if [ ! -d "$D0" ]; then
    npm ci --prefix --production
fi


# Build server for production
npm run build
D1=dist/docker/winner-drinks/dist/server
if [ -d "$D1" ]; then
    rm -Rf $D1
fi
cp -r dist/server dist/docker/winner-drinks/dist


# Install npm packages on client for production
D2=client/node_modules
if [ ! -d "$D2" ]; then
    npm ci --prefix client --production
fi


# Build client for local production 
npm run build --prefix client
D4=dist/docker/winner-drinks/dist/build
if [ -d "$D4" ]; then
    rm -Rf $D4 
fi
mv client/build dist/docker/winner-drinks/dist


# Copy package.json to dist/docker/winner-drinks/
F2=dist/docker/winner-drinks/package.json
if [ -f "$F2" ]; then
    rm -Rf $F2
fi
cp package.json dist/docker/winner-drinks


# Copy package-lock.json to dist/docker/winner-drinks/
F3=dist/docker/winner-drinks/package-lock.json
if [ -f "$F3" ]; then
    rm -Rf $F3
fi
cp package-lock.json dist/docker/winner-drinks
