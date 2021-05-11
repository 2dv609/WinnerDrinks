# WinnerDrinks

This is the complete repository for the WinnerDrinks application. 

You'll find the client side code built in React and TypeScript in the directory *client*

and the server side code in the directory *server*. 


### Notes on running the app locally for development
Make sure Docker is running on your computer.  
Run `npm install` in both the server and client directory.  
Then run the script build_app_production.sh in the root directory.  
Then in server/dist, run the script run_app_production_local.sh.  
Open localhost:4000 on your computer. 


### Build app for production
```
$ ./build_app_production.sh
```

### Build production for local testing of serviceworkers and IndexedDB
```
$ ./build_app_production_local.sh
```

### Build production folder
```
server/dist
```

### Git Workflow

#### 1. Clone the dev branch and checkout your new branch
 ```
$ git clone --single-branch --branch=dev yourgitrepourl
  
$ git checkout -b yourbranchname
```

#### 2. Work on the new branch locally
```
$ git add .

$ git commit -m 'your commit message'
```

#### 3. If wrong last commit
```
$ git reset --soft HEAD~1
```

#### 4. Push your new branch to remote git repository

```
$ git push
```
If pushing branch for the first time:
```
$ git push --set-upstream origin yourbranchname
```

#### 5. (Optional) Merge new changes from dev INTO your branch __(dev --> yourbranch)__
Commit your changes in your branch. Then:
```
$ git checkout dev

$ git pull

$ git checkout yourbranchname

$ git merge dev
```

#### 6. Merge your branch INTO dev __(yourbranch --> dev)__
Commit your changes in your branch. Then:
```
$ git checkout dev

$ git pull

$ git merge yourbranchname

$ git push
```

#### 7. Delete your branch locally
```
$ git checkout anyotherbranch

$ git branch -d yourbranchname
```
#### 8. Delete your branch in remote repo
```
$ git checkout anyotherbranch

$ git push origin --delete yourbranchname
```
  
  * If merge conflicts try to solve it or ask for help.  
