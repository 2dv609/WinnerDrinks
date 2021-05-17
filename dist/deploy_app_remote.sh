#!/bin/bash

# -----------------------------------
# Build and deploy application remote
# -----------------------------------

# Variables:
# $1 = Path to ssh key
# $2 = Remote public ip adress machine 1, "wd_application-2"
# $3 = Remote public ip adress machine 2, "wd_application-1"
# $4 = Remote public ip adress machine 3, "wd_vm_1"
# OBS! Puplic ip can be find at cscloud

# Test if any variable is empty
if [[ "$1" = ""  || "$2" = "" || "$3" = "" || "$4" = "" ]]; then
echo "
Error empty variables
\$1 = Path to ssh key
\$2 = Remote public ip adress machine 1, \"wd_application-2\"
\$3 = Remote public ip adress machine 2, \"wd_application-1\"
\$4 = Remote public ip adress machine 3, \"wd_vm_1\"
OBS! Puplic ip can be find at cscloud"

exit 1
fi

# Source functions
source build_app_remote.function.sh
source scp_app_to_remote.function.sh
source execute_app_remote.function.sh

# Execute functions
build_app_remote
scp_app_to_remote $1 $2 $3 $4
execute_app_remote $1