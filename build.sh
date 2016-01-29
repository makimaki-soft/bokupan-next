#!/bin/sh
OUT_DIR=build
# make version.js
VERSION=`git describe --tags --abbrev=4`
echo "Build version "$VERSION
cocos compile -p web --advanced -m release -o $OUT_DIR/$VERSION
PROJECT_FILE=$OUT_DIR/$VERSION/project.json
project_json=`cat $PROJECT_FILE | jq --arg app_version $VERSION '.app_version=$app_version'`
echo $project_json > $PROJECT_FILE
echo "Project Configuration Done."