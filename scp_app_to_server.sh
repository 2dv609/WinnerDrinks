#!/bin/bash

# $1 = Path to ssh key

if [ "$1" = "" ]; then

	echo "Set parameter \$1 to ssh key path"

else

	scp -r -i $1 server/dist/* ubuntu@194.47.177.14:/var/www/winner-drinks

fi

