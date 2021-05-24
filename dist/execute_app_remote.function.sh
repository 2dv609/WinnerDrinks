#  ----------------------------------------
# Execute application on configured servers
# $1 = Path to ssh key
# -----------------------------------------

function execute_app_remote() {
    if [ "$1" = "" ]; then
        echo "Set parameter \$1 to ssh key path"

    else
        ansible-playbook ansible/update-winner-drinks.yaml -u ubuntu --private-key $1
    fi
}
