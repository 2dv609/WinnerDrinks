#!/bin/bash

# $1 = Path to ssh key

# Remove node_modules if exist due to local production test
D1=server/dist/node_modules
if [ -d "$D1" ]; then
    rm -Rf $D1
fi

# Copy app to production server
if [ "$1" = "" ]; then
	echo "Set parameter \$1 to ssh key path"

elif [ "$2" = "" ]; then
	echo "Set parameter \$2 to <user>@<server_public_IP>"	
else
	scp -r -i $1 server/dist/* $2:/var/www/winner-drinks
fi

