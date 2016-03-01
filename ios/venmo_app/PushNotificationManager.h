#import "RCTBridgeModule.h"
#import <OneSignal/OneSignal.h>

@interface PushNotificationManager : NSObject <RCTBridgeModule>
@property (strong, nonatomic) OneSignal *oneSignal;
@end
