import {
  REQUEST_CHARGES,
  RECEIVE_CHARGES,
} from '../constants/actionTypes';

import * as ajax from '../shared/ajax.js';
import React from 'react-native'

var _ = require('lodash');

function receiveCharges(parsedResponse) {
  return dispatch => {
    dispatch({
      type: RECEIVE_CHARGES,
      charges: parsedResponse.payments,
      receivedAt: Date.now()
    });
  }
}

exports.fetchCharges = function(email, token) {
  return dispatch => {
    dispatch({type:  REQUEST_CHARGES });

    return ajax.getCharges(email, token)
               .then(response => {
                 if (response.status == 200) {
                   response.json()
                     .then(receiveCharges)
                     .then(dispatch);
                 }
               })
               .catch(handleError);
  }
}

exports.payPendingCharge = function(email, token, paymentId) {
  var nonce = "fake-valid-nonce"

  return dispatch => {
    dispatch(requestPayment());
    return ajax.payPendingCharge(email, token, paymentId, nonce)
               .then(response => {
                 var promiseAll = Promise.all([
                   dispatch(fetchSocialFeed(email, token)),
                   dispatch(fetchPrivateFeed(email, token))
                 ])
                 promiseAll.then(() => {
                     response.json()
                     .then(json => dispatch(receivePayment(json.data, navigator)))
                 });
               })
               .catch(error => console.log(error));
  }
}

