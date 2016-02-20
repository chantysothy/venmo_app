'use strict';

var {NativeModules} = require('react-native');
var androidFacebookLoginManager = NativeModules.FBLoginManager;

var PERMISSIONS_TO_INCLUDE = ["email", "public_profile"];

exports = module.exports = {}

exports.newSession = function(onComplete) {
  androidFacebookLoginManager.loginWithPermissions(PERMISSIONS_TO_INCLUDE, onComplete);
}
