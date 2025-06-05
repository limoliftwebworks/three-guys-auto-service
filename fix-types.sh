#!/bin/bash

# Exit on error
set -e

echo "Running Type Fixing Script..."

# Run the Node.js script
node scripts/fix-config-types.js

# Check if there are any errors in the TypeScript files
echo "Checking TypeScript files..."
npx tsc --noEmit

echo "Done! If no errors were shown, the fix was successful." 