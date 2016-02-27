import React, {
  Dimensions,
} from 'react-native';

var BTClient = require('react-native-braintree');

import * as ajax from '../shared/ajax';

export function braintreeNonce() {
  return new Promise((resolve, reject) => {
    BTClient.showPaymentViewController((err, nonce) => {
      err ? reject(err) : resolve(nonce)
    });
  });
}

export function initBraintreeWithToken() {
  return new Promise((resolve, reject) => {
    ajax.getClientToken().then((response) => {
      response.json().then((json) => {
        BTClient.setup(json.client_token):
        resolve();
      });
    });
  });
}
