#!/bin/bash

# Export the GIT_URL environment variable
export GIT_URL="$1"
# Export the DIR_NAME environment variable
export DIR_NAME=$(basename "$GIT_URL" .git)
# Clone the repository
git clone "$GIT_URL" /home/trilo/output/"${DIR_NAME}"
# Navigate to the cloned repository directory
cd /home/trilo/output/"${DIR_NAME}" || exit
# Install dependencies
npm install --force && npm run build
# Start the Node.js server
# node index.js
