#!/bin/bash
pushd $(dirname $(which $0))
. /opt/fpp/scripts/common
setSetting restartFlag 1
popd
