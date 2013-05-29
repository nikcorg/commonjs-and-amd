ENV_SETUP="./bin/env-setup.sh"

if [ ! -f $ENV_SETUP ]; then
    ENV_SETUP=$(find . -name "env-setup.sh")

    if [ -z "$ENV_SETUP" -o ! -f $ENV_SETUP ]; then
        echo "Can't find env-setup.sh"
        exit 1
    fi
fi

source $ENV_SETUP

if [ ! -d $NODE_EXPRESS_STATIC ]; then
    echo "Static folder not found, did you remember to build?"
    exit 1
fi

node server/server
