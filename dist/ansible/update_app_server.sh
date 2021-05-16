#!/bin/bash

# $1 = Path to ssh key

# Copy app to production server
if [ "$1" = "" ]; then
	echo "Set parameter \$1 to ssh key path"

else
    ansible-playbook update-winner-drinks.yaml -u ubuntu --private-key $1
fi
