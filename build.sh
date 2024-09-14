#! /bin/bash

echo "Building vKeyBind..."

zip -r vkeybind.zip ./src -x ./src/helpers/logger.js

echo "Done"

