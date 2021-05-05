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
else
	scp -r -i $1 server/dist/* ubuntu@194.47.177.14:/var/www/winner-drinks
fi

