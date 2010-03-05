//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"development";
NSString * const TI_APPLICATION_ID = @"com.lightrail.snapost";
NSString * const TI_APPLICATION_PUBLISHER = @"Kevin Whinnery for Appcelerator Inc.";
NSString * const TI_APPLICATION_URL = @"http://appcelerator.com";
NSString * const TI_APPLICATION_NAME = @"Snapost";
NSString * const TI_APPLICATION_VERSION = @"1.1";
NSString * const TI_APPLICATION_DESCRIPTION = @"Snapost is the easiest way to share photos from your mobile device.";
NSString * const TI_APPLICATION_COPYRIGHT = @"2010 by Appcelerator";
NSString * const TI_APPLICATION_GUID = @"ceb92217583a431eb0db67d76e79c2d6";
BOOL const TI_APPLICATION_ANALYTICS = true;

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

    int retVal = UIApplicationMain(argc, argv, nil, nil);
    [pool release];
    return retVal;
}
