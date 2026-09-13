#!/bin/bash
set -e
pushd $(dirname $(which $0))
. /opt/fpp/scripts/common
DATADIR="${MEDIADIR}/plugindata/FPP-Plugin-MessageQueue"
mkdir -p "${DATADIR}"
# migrate an existing database out of config/ (binaries must not live there)
if [ -f "${CFGDIR}/FPP.FPP-Plugin-MessageQueue.db" ]; then
    mv "${CFGDIR}/FPP.FPP-Plugin-MessageQueue.db" "${DATADIR}/"
fi
if [ -f "${CFGDIR}/plugin.FPP-Plugin-MessageQueue" ]; then
    sed -i -e '/^MESSAGE_FILE/ s#%2Fconfig%2FFPP.FPP-Plugin-MessageQueue.db#%2Fplugindata%2FFPP-Plugin-MessageQueue%2FFPP.FPP-Plugin-MessageQueue.db#' "${CFGDIR}/plugin.FPP-Plugin-MessageQueue"
fi
chown -R ${FPPUSER}:${FPPGROUP} "${DATADIR}"
setSetting restartFlag 1
popd
