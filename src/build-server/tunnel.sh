#!/bin/bash

# Export the GIT_URL environment variable
export GIT_URL="$1"

# Clone the repository
git clone "$GIT_URL" /home/trilo/output

# Execute node script
exec node index.js
