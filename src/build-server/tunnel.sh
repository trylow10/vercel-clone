#!/bin/bash

export GIT_URL="$1"
export DIR_NAME=$(basename "$GIT_URL" .git)
git clone "$GIT_URL" /home/trilo/output/"${DIR_NAME}"
cd /home/trilo/output/"${DIR_NAME}" || exit
npm install --force && npm run build
# Start the Node.js server
# node index.js
