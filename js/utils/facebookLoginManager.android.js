'use strict';

var {NativeModules} = require('react-native');
var androidFacebookLoginManager = NativeModules.FBLoginManager;

var PERMISSIONS_TO_INCLUDE = ["email", "public_profile", "user_friends"];

exports = module.exports = {}

exports.newSession = function(onComplete) {
  androidFacebookLoginManager.loginWithPermissions(PERMISSIONS_TO_INCLUDE, onComplete);
}

exports.logout = function(onComplete) {
  androidFacebookLoginManager.logout(onComplete);
}
