PWD=$(pwd)

# NODE_ENV is detected based on which folders exist
# Arguable brittle, but it's simple

NODE_ENV="debug"
NODE_EXPRESS_STATIC="client-$NODE_ENV"

if [ ! -d $NODE_EXPRESS_STATIC ]; then
    NODE_ENV="build"
    NODE_EXPRESS_STATIC="client-$NODE_ENV"
fi

NODE_PATH=$PWD/server:$PWD/server/node_modules:$PWD/client/app

export NODE_ENV NODE_PATH NODE_EXPRESS_STATIC
