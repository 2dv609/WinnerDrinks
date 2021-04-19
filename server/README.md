# Readme prototype server

1. Initiate values in files for mongo db username and password

  * server/container/secrets/mongodb_pw. Default is admin
  * server/container/secrets/mongodb_user. Default is admin

2. Create file .env in folder __server__ and initiate values see .env.example. OBS! PORT must be 4000 and username and password must be the same as in step 1.

3. In folder __container__ run. OBS! must be in docker swarm mode 

```
$ docker-compose up --build -d
```

4. Start server from folder __server__

__Start server and intiate database__

```
$ npm run start:dev all
```

__Start server without intiate database__

```
$ npm run start:dev
```

5. Start application from folder __client__

```
npm run start
```
