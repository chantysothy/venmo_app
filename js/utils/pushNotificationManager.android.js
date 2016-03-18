'use strict';

//var pushNotificationManager = require('NativeModules').PushNotificationManager;

import OneSignal from 'react-native-onesignal'; // Import package from node modules

OneSignal.configure({
  onNotificationOpened: function(message, data, isActive) {
    console.log('MESSAGE: ', message);
    console.log('DATA: ', data);
    console.log('ISACTIVE: ', isActive);
  }
});

exports = module.exports = {}
exports.getUserId = function(cb) {
  OneSignal.idsAvailable((idsAvailable) => {
    cb(idsAvailable.playerId);
  });
};

exports.registerForPushNotifications = function() {};
