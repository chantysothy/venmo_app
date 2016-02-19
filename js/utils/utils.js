'use strict';

exports = module.exports = {};

var React = require('react-native');

var store = require('react-native-simple-store');

exports.withEmailAndToken = function(callback) {
  store.get('email').then(email => {
    store.get('token').then(token => callback(email, token));
    }
  );
}
