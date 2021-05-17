#!/bin/bash

# ----------------------------------
# Build and deploy application local
# ----------------------------------

# Source functions
source build_app_local.function.sh
source execute_app_local.function.sh

# Execute functions
build_app_local
execute_app_local