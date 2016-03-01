#import "PushNotificationManager.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation PushNotificationManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getUserId) {
  self.oneSignal = [[OneSignal alloc] init];
  [self.oneSignal IdsAvailable:^(NSString* userId, NSString* pushToken) {
    if (pushToken != nil) {
      [self.bridge.eventDispatcher sendAppEventWithName:@"onesignalIdReceived"
                                               body:@{@"onesignalId": userId, @"pushToken": pushToken}];
    } else {
      [self.bridge.eventDispatcher sendAppEventWithName:@"onesignalIdReceived"
                                               body:@{@"onesignalId": userId}];
    }
  }];
};

RCT_EXPORT_METHOD(registerForPushNotifications) {
  self.oneSignal = [[OneSignal alloc] init];
  [self.oneSignal registerForPushNotifications];
};

RCT_EXPORT_METHOD(setSubscription:(BOOL)value) {
  self.oneSignal = [[OneSignal alloc] init];
  [self.oneSignal setSubscription:value];
};

RCT_EXPORT_METHOD(sendTag:(NSString *)key value:(NSString *)value) {
  self.oneSignal = [[OneSignal alloc] init];
  [self.oneSignal sendTag:key value:value];
};




@end