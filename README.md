# WinnerDrinks

This is the complete repository for the WinnerDrinks application. 

You'll find the client side code built in React and TypeScript in the directory *client*

and the server side code in the directory *server*. 


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

### Git

1. Clone the dev branch
 ```
$ git clone --single-branch --branch=dev <git_repository>
  
$ git checkout -b <new_branch>
```

2. Work on the new branch
```
$ git add .

$ git comm -m <commit>
```

3. Push branch to git repository
```
$ git push -u origin <new_branch>
```

4. Merge <new_branch> to <dev> on github. 
  
  * Make sure you merge <new_branch> branch to the dev branch. 
  
  * If merge conflicts try to solve it or ask for help.  
  
  * Delete branch <new_branch> 


  
