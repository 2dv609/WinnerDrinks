# ------------------------------------------------------------
# Copy app to production servers and rewrite ansible/inventory
#
# $1 = Path to ssh key
# $2 = Remote public ip adress machine 1, "wd_application-2"
# $3 = Remote public ip adress machine 2, "wd_application-1"
# $4 = Remote public ip adress machine 3, "wd_vm_1"
#
# OBS! Puplic ip can be find at cscloud
# ------------------------------------------------------------

function scp_app_to_remote() {
	if [ "$1" = "" ]; then
		echo "Set parameter \$1 to ssh key path"

	elif [ "$2" = "" ]; then
		echo "Set parameter \$3 to to public ip adress machine 1 <username>@<server_public_IP>"

	elif [ "$3" = "" ]; then
		echo "Set parameter \$4 to to public ip adress machine 2 <username>@<server_public_IP>"

	elif [ "$4" = "" ]; then
		echo "Set parameter \$5 to public ip adress machine 3 <username>@<server_public_IP>"

	else
		F1=ansible/inventory
		if [ -f "$F1" ]; then
			rm $F1
		fi
		
	# Write pulic ips to ansible/inventory file 
		echo "[development]
	$2
	$3
	$4

	[test]
	$2" > $F1

		echo ""
		echo "Copy to machine ubuntu@$2"
		scp -r -i $1 docker/* ubuntu@$2:/var/www/winner-drinks

		echo ""
		echo "Copy to machine ubuntu@$3"
		scp -r -i $1 docker/* ubuntu@$3:/var/www/winner-drinks
		
		echo ""
		echo "Copy to machine ubuntu@$4"
		scp -r -i $1 docker/* ubuntu@$4:/var/www/winner-drinks
	fi
}