#! /bin/bash

echo "Building vKeyBind..."

cd ./src/

zip -r vkeybind.zip ./ -x ./src/helpers/logger.js

mv ./vkeybind.zip ../vkeybind.zip

echo "Done"

