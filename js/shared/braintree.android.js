var Braintree = require('react-native-braintree-android');

var client_token = "";

import * as ajax from '../shared/ajax';

export function braintreeNonce() {
  return Braintree.paymentRequest(client_token)
}

export function initBraintreeWithToken() {
  ajax.getClientToken().then((resonse) => {
    resonse.json().then((json) => client_token = json.client_token);
  });
}
