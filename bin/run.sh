PWD=$(pwd)
ENV=$1

[ "x$ENV" = "x" ] && ENV="debug"

ENV=$ENV STATIC="client-$ENV" NODE_PATH=$PWD/server:$PWD/server/node_modules:$PWD/client/app node server/server
