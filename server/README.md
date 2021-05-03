# Readme prototype server

<br>

## 1 Initiate values in files for mongo db username and password

  * server/container/secrets/mongodb_pw. Default is admin
  * server/container/secrets/mongodb_user. Default is admin

<br>

## 2 Create file .env 

Creat file server/.env and initiate values see .env.example. OBS! PORT must be 4000 and username and password must be the same as in step 1. Or just copy server/.env.example to server/.env if you want to use standard values for password, username and port.

<br>

## 3 Make sure that Docker is running on your system. 

In folder __dist/container__ run. OBS! Maybe need be in docker swarm mode 

```
$ docker-compose up --build -d
```

<br>

## 4 Start server from folder __server__

__Start server and intiate database__

```
$ npm run start:dev:init
```

__Start server without intiating the database__

```
$ npm run start:dev
```

<br>

## 5 Start application from folder __client__

```
npm run start
```

<br>

## 6 Loaded data

* Loaded trivia data can be found in file server/data/trivia.json
* Loaded party data can be found in file server/data/party.json

<br>

## 7 Open database

* run to open container 
```
$ docker exec -it mongodb_wd bash 
```

* run to open database (-u admin -p admin is tha default settings)
```
$ mongo -u admin -p admin 
```

* Run to open collections

```
$ show collections
$ db.multiquestions.find().pretty()
$ db.parties.find().pretty()
$ db.trivias.find().pretty()
```
