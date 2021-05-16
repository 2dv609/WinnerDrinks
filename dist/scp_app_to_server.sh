#!/bin/bash

# $1 = Path to ssh key
# $2 = remote login = <user>@<server_public_IP>

# Copy app to production server
if [ "$1" = "" ]; then
	echo "Set parameter \$1 to ssh key path"

elif [ "$2" = "" ]; then
	echo "Set parameter \$2 to <user>@<server_public_IP>"	
else
	scp -r -i $1 docker/* $2:/var/www/winner-drinks
fi
