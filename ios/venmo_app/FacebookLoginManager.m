#import "FacebookLoginManager.h"
#import "FBSDKCoreKit/FBSDKCoreKit.h"
#import "FBSDKLoginKit/FBSDKLoginKit.h"


@implementation FacebookLoginManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logout) {
  [[[FBSDKLoginManager alloc] init] logOut];
};

RCT_EXPORT_METHOD(newSession:(RCTResponseSenderBlock)callback) {
  dispatch_async(dispatch_get_main_queue(), ^{
    
    
    FBSDKLoginManager *login = [[FBSDKLoginManager alloc] init];
    NSArray *permissions = @[@"public_profile", @"user_friends", @"email"];
    [login logInWithReadPermissions:permissions handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
      
      if (error) {
        callback(@[@"Error", [NSNull null]]);
      } else if (result.isCancelled) {
        callback(@[@"Canceled", [NSNull null]]);
      } else {
        FBSDKAccessToken *token = result.token;
        NSString *tokenString = token.tokenString;
        NSString *userId = token.userID;
        NSString *fields = @"first_name, last_name, id, email";
        
        [[[FBSDKGraphRequest alloc] initWithGraphPath:@"me" parameters:@{@"fields": fields}]
         startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
           if (error) {
             callback(@[@"Error", [NSNull null]]);
           } else {
             NSString *email= [result objectForKey:@"email"];
             NSString *firstName= [result objectForKey:@"first_name"];
             NSString *lastName= [result objectForKey:@"last_name"];
             NSDictionary *credentials = @{ @"token" : tokenString, @"userId" : userId,
                                            @"email" : email, @"firstName" : firstName, @"lastName" : lastName };
             callback(@[[NSNull null], credentials]);
           }
         }];
      }
    }];
  });
};

@end

