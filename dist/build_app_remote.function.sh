# ---------------------------------------
# Build application for production remote
# ---------------------------------------

function build_app_remote {
    # Check if client/.env exists
    F1=../client/.env
    if [ ! -f "$F1" ]; then
        echo "File client/.env is missing"
        exit 1

    else # Write .env to build for production 
        echo "REACT_APP_SERVER_URL=https://winner-drinks.xyz
    PUBLIC_URL=https://winner-drinks.xyz" > $F1    

    fi

    # Create a dist/winner-drinks/build folder
    DB=docker/winner-drinks/build
    if [ ! -d "$DB" ]; then
        mkdir $DB
    fi

    # Install npm packages on server for production
    D0=../server/node_modules
    if [ ! -d "$D0" ]; then
        npm ci --prefix ../server --production
    fi


    # Build server for production
    npm run build --prefix ../server


    # Copy server build to dist/docker/winner-drinks/build/server 
    D1=docker/winner-drinks/build/server
    if [ -d "$D1" ]; then
        rm -Rf $D1/
    fi
    mkdir $D1
    cp -r ../server/build/* $D1


    # Install npm packages on client for production
    D2=../client/node_modules
    if [ ! -d "$D2" ]; then
        npm ci --prefix ../client --production
    fi


    # Build client for production 
    npm run build --prefix ../client


    # Copy client build to dist/docker/winner-drinks/build/client
    D4=docker/winner-drinks/build/client
    if [ -d "$D4" ]; then
        rm -Rf $D4 
    fi
    mkdir $D4
    cp -r ../client/build/* $D4


    # Copy server/data to D1
    D5=docker/winner-drinks/build/data
    if [ -d "$D5" ]; then
        rm -Rf $D5 
    fi
    mkdir $D5
    cp -r ../server/data/* $D5


    # Copy server/package.json to dist/docker/winner-drinks/
    F2=docker/winner-drinks/package.json
    if [ -f "$F2" ]; then
        rm -Rf $F2
    fi
    cp ../server/package.json docker/winner-drinks


    # Copy server/package-lock.json to dist/docker/winner-drinks/
    F3=docker/winner-drinks/package-lock.json
    if [ -f "$F3" ]; then
        rm -Rf $F3
    fi
    cp ../server/package-lock.json docker/winner-drinks


    # Roleback client/.env file
    echo "REACT_APP_SERVER_URL=http://localhost:4000 
    PUBLIC_URL=http://localhost:4000" > $F1
}
