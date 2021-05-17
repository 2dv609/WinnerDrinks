# WinnerDrinks

This is the complete repository for the WinnerDrinks application. 

You'll find the client side code built in React and TypeScript in the directory *client*

and the server side code in the directory *server*. 


### Notes on running the app locally for development
Make sure Docker is running on your computer.  
Run `npm ci` in both the server and client directory and
create a server/.env   
Then... 

```
cd dist
```

```
./start_mongodb_container_development.sh
```

```
cd ../server
```

```
npm run start:dev:init
```

```
cd ../client
```

```
npm run start
```

Open localhost:3000 on your computer. 


### Build and deploy app for production

Make sure ansible and python is running on your computer, 
the scripts is tested with

* Ansible version 2.9.6
* Python version 3.8.5

```
cd dist
```

```
./deploy_app_remote.sh <path_to_ssh_key> <public_ip_addres_machine_1> <public_ip_addres_machine_2> <public_ip_addres_machine_3>
```

Open winner-drinks.xyz, obs can take some minute. 

OBS! Application is cached and you may have to 

* Unregister service-woker
* Delete cached storage
* Delete indexedDB 
* Reload the page to get the latest update visible. 


### Build and deploy for local production, for testing of serviceworkers and IndexedDB etc

```
cd dist
```

```
./deploy_app_local.sh
```

Open localhost:4000 on your computer, obs can take some minute.

OBS! Application is cached and you may have to 

* Unregister service-woker
* Delete cached storage
* Delete indexedDB 
* Reload the page to get the latest update visible. 


### Git Workflow

#### 1. Clone the dev branch and checkout your new branch

```
git clone --single-branch --branch=dev yourgitrepourl
  
git checkout -b yourbranchname
```

#### 2. Work on the new branch locally

```
git add .

git commit -m 'your commit message'
```

#### 3. If wrong last commit

```
git reset --soft HEAD~1
```

#### 4. Push your new branch to remote git repository

```
git push
```

If pushing branch for the first time:

```
git push --set-upstream origin yourbranchname
```

#### 5. (Optional) Merge new changes from dev INTO your branch __(dev --> yourbranch)__

Commit your changes in your branch. Then:

```
git checkout dev

git pull

git checkout yourbranchname

git merge dev
```

#### 6. Merge your branch INTO dev __(yourbranch --> dev)__

Commit your changes in your branch. Then:

```
git checkout dev

git pull

git merge yourbranchname

git push
```

#### 7. Delete your branch locally

```
git checkout anyotherbranch

git branch -d yourbranchname
```

#### 8. Delete your branch in remote repo

```
git checkout anyotherbranch

git push origin --delete yourbranchname
```
  
  * If merge conflicts try to solve it or ask for help.  
