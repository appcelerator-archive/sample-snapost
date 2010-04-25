#!/bin/sh
cp -R "$WEB_SRC_ROOT/" "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/"
find "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH" -name '*.html' -exec rm {} +
find "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH" -name '*.css' -exec rm {} +
find "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH" -name '*.js' -exec rm {} +
find "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH" -name '*.a' -exec rm {} +
/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin/iphoneos-optimize "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/"
find "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/" -type d -empty -delete

