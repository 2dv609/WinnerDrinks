#!/bin/bash

# Build application for production


# Install npm packages on server for production
D1=server/node_modules
if [ ! -d "$D1" ]; then
    npm ci --prefix server --production
fi


# Install npm packages on client for production
D2=client/node_modules
if [ ! -d "$D2" ]; then
    npm ci --prefix client --production
fi


# Build server for production
D3=server/dist
if [ ! -d "$D3" ]; then
    mkdir server/dist
fi
npm run build --prefix server


# Create client/dotenv if not exist
F1=client/.env
if [ -f "$F1" ]; then
    mkdir $F1
fi


# Build client for production 
D4=server/dist/build
if [ -d "$D4" ]; then
    rm -Rf $D4 
fi
cat client/.env.production > client/.env
npm run build --prefix client
mv client/build server/dist/
cat client/.env.development > client/.env


# Copy server/package.json to server/dist
F2=server/dist/package.json
if [ -f "$F2" ]; then
    rm -Rf $F2
fi
cp server/package.json server/dist/


# Copy server/package-lock.json to server/dist
F3=server/dist/package-lock.json
if [ -f "$F3" ]; then
    rm -Rf $F3
fi
cp server/package-lock.json server/dist/

