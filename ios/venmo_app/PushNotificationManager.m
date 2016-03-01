#import "PushNotificationManager.h"

@implementation PushNotificationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getUserId:(RCTResponseSenderBlock)callback) {
  self.oneSignal = [[OneSignal alloc] init];
  [self.oneSignal IdsAvailable:^(NSString* userId, NSString* pushToken) {
      callback(@[userId, pushToken]);
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