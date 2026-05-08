#!/bin/bash
set -a
source "$(dirname "$0")/.env"
set +a

export N8N_USER_FOLDER="$(dirname "$0")/data"

# Pass custom vars to n8n so they're available as $vars.KEY in workflows
export N8N_CUSTOM_EXTENSIONS=""

echo "Starting n8n on http://localhost:${N8N_PORT:-5678}"
npx n8n start
