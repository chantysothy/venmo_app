'use strict';

var pushNotificationManager = require('NativeModules').PushNotificationManager;

exports = module.exports = {}
exports.getUserId = pushNotificationManager.getUserId;
exports.registerForPushNotifications = pushNotificationManager.registerForPushNotifications;
