PWD=$(pwd)
NODE_ENV=$1

[ "x$NODE_ENV" = "x" ] && NODE_ENV="debug"

NODE_PATH=$PWD/server:$PWD/server/node_modules:$PWD/client/app
NODE_EXPRESS_STATIC="client-$NODE_ENV"

export NODE_ENV NODE_PATH NODE_EXPRESS_STATIC
