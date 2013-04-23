PWD=$(pwd)
ENV=$1

[ "x$ENV" = "x" ] && ENV="debug"

STATIC="client-$ENV" NODE_PATH=$PWD/server:$PWD/server/node_modules:$PWD/client/app node server/server
