'use strict';


var iosFacebookLoginManager = require('NativeModules').FacebookLoginManager;

exports = module.exports = {}
exports.newSession = iosFacebookLoginManager.newSession;
exports.logout = () => null;
