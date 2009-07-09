/**
 * Appcelerator Titanium Mobile
 * This is generated code. Do not modify. Your changes will be lost.
 * Generated code is Copyright (c) 2009 by Appcelerator, Inc.
 * All Rights Reserved.
 */
#import <Foundation/Foundation.h>

@protocol TitaniumAppAssetResolver
- (NSData*) resolveAppAsset:(NSURL*)url;
- (oneway void)release;
- (id)retain;
@end

@interface ApplicationRouting : NSObject<TitaniumAppAssetResolver> {
}
- (NSData*) resolveAppAsset:(NSURL*)url;
- (NSData*) styleNamedIndex;
- (NSData*) pageNamedIndex;
- (NSData*) pageNamedTwitter;
- (NSData*) scriptNamedJs_index;
- (NSData*) scriptNamedJs_jquery_1_3_2;
- (NSData*) scriptNamedJs_twitter;

@end
