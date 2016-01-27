#!/bin/sh
OUT_DIR=build
PROJECT_FILE=./project.json

# make version.js
VERSION=`git describe --tags --abbrev=4`
project_json=`cat $PROJECT_FILE | jq --arg app_version $VERSION '.app_version=$app_version'`
echo "$project_json" > $PROJECT_FILE
echo "Build version "$VERSION
cocos compile -p web --advanced -m release -o $OUT_DIR/$VERSION
