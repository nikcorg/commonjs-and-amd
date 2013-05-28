ENV_SETUP="./bin/env-setup.sh"

if [ ! -f $ENV_SETUP ]; then
    ENV_SETUP=$(find . -name "env-setup.sh")

    if [ -z "$ENV_SETUP" -o ! -f $ENV_SETUP ]; then
        echo "Can't find env-setup.sh"
        exit 1
    fi
fi

source $ENV_SETUP

grunt simplemocha
