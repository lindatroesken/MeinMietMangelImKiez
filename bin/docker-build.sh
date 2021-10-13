#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$(dirname "$DIR/../..")"
MAVEN="${ROOT}/backend"

CONTAINER_NAME="mietmangelmanager"
IMAGE_NAME=${1-${CONTAINER_NAME}:junit}

# https://docs.docker.com/edge/engine/reference/commandline/rmi/
# https://docs.docker.com/edge/engine/reference/commandline/images/

OLD_CONTAINER=$(docker ps --filter "name=${CONTAINER_NAME}" -q)
if [ -n "${OLD_CONTAINER}" ]; then
    echo "🐳 Stopping old running container named ${CONTAINER_NAME}"
    (cd "${ROOT}"; docker stop ${OLD_CONTAINER})
fi;

OLD_CONTAINER=$(docker ps -a --filter "name=${CONTAINER_NAME}" -q)
if [ -n "${OLD_CONTAINER}" ]; then
    echo "🐳 Removing old container named ${CONTAINER_NAME}"
    (cd "${ROOT}"; docker rm ${OLD_CONTAINER})
fi;

OLD_IMAGES=$(docker images ${IMAGE_NAME} -q)
if [ -n "${OLD_IMAGES}" ]; then
    echo "🐳 Removing old images named ${IMAGE_NAME}"
    (cd "${ROOT}"; docker rmi "$(docker images ${IMAGE_NAME} -q)" --force)
fi;

echo "🚧 Creating jar file from maven root ${MAVEN}"
(cd ${MAVEN}; pwd)
(cd ${MAVEN}; mvn clean install)

# https://docs.docker.com/edge/engine/reference/commandline/build/#options
echo "🐳 Building image ${IMAGE_NAME}"
(cd "${ROOT}"; docker build --tag ${IMAGE_NAME} --file Dockerfile . --rm)

UNTAGGED_IMAGES=$(docker images -q --filter "dangling=true" -q)
if [ -n "${UNTAGGED_IMAGES}" ]; then
    echo "🐳 Removing untagged images"
    (cd "${ROOT}"; docker rmi "$(docker images -q --filter "dangling=true" -q)" --force)
fi;