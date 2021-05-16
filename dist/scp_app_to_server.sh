#!/bin/bash

# $1 = Path to ssh key
# $2 = remote login username <username>@<server_public_IP>
# $3 = remote login public ip adress machine 1
# $3 = remote login public ip adress machine 2
# $3 = remote login public ip adress machine 3

# Copy app to production server
if [ "$1" = "" ]; then
	echo "Set parameter \$1 to ssh key path"

elif [ "$2" = "" ]; then
	echo "Set parameter \$2 to <username>@<server_public_IP>"

elif [ "$3" = "" ]; then
    echo "Set parameter \$3 to to public ip adress machine 1 <username>@<server_public_IP>"

elif [ "$4" = "" ]; then
    echo "Set parameter \$4 to to public ip adress machine 2 <username>@<server_public_IP>"

elif [ "$5" = "" ]; then
    echo "Set parameter \$5 to public ip adress machine 3 <username>@<server_public_IP>"

else
	F1=ansible/inventory
	if [ -f "$F1" ]; then
		rm $F1
	fi
    
# Write ansible/inventory file 
    echo "[development]
$3
$4
$5

[test]
$3" > $F1

	echo ""
	echo "Copy to machine $2@$3"
	scp -r -i $1 docker/* $2@$3:/var/www/winner-drinks

	echo ""
	echo "Copy to machine $2@$4"
	scp -r -i $1 docker/* $2@$4:/var/www/winner-drinks
	
	echo ""
	echo "Copy to machine $2@$5"
	scp -r -i $1 docker/* $2@$5:/var/www/winner-drinks

fi
