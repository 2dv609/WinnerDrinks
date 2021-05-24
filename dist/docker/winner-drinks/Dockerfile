FROM node:14

# Reference https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Create app directory
WORKDIR /var/www/winner-drinks

# Install app dependencies A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package.json ./

COPY package-lock.json ./

RUN npm ci --production

RUN npm install pm2 -g

COPY build .

CMD [ "pm2-runtime", "server/server.js" ]
