import {
  REQUEST_CHARGES,
  RECEIVE_CHARGES,
  REQUEST_CHARGE_PAYMENT,
  RECEIVE_CHARGE_PAYMENT,
  REQUEST_DECLINE_CHARGE,
  RECEIVE_DECLINE_CHARGE,
} from '../constants/actionTypes';

import * as ajax from '../shared/ajax.js';
import React from 'react-native'
import { refreshState } from './genericActions.js';

var { NativeAppEventEmitter } = require('react-native');
import { initBraintreeWithToken, braintreeNonce } from '../shared/braintree';

var _ = require('lodash');

function handleError(error) {
  console.log("Encountered error in GET request for private charges.");
  console.log(error);
}

function receiveCharges(parsedResponse) {
  return dispatch => {
    dispatch({
      type: RECEIVE_CHARGES,
      charges: parsedResponse.payments,
      receivedAt: Date.now()
    });
  }
}

function receiveChargePayment(parsedResponse) {
  if (parsedResponse.error !== undefined) {
    NativeAppEventEmitter.emit("showPopup", {
      title: "Payment Error",
      content: [parsedResponse.error],
      buttonText: "Okay",
    });
  }

  return dispatch => {
    dispatch({
      type: RECEIVE_CHARGE_PAYMENT,
      receivedAt: Date.now()
    });
  }
}

function receiveDeclinePayment(parsedResponse) {
  if (parsedResponse.error !== undefined) {
    NativeAppEventEmitter.emit("showPopup", {
      title: "Error in declining charge",
      content: [parsedResponse.error],
      buttonText: "Okay",
    });
  }

  return dispatch => {
    dispatch({
      type: RECEIVE_DECLINE_CHARGE,
      receivedAt: Date.now()
    });
  }
}

function fetchCharges(email, token) {
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

exports.fetchCharges = fetchCharges;

exports.payPendingCharge = function(user, payment) {
  var email = user.user.email;
  var token = user.authentication_token;
  var parsedAmountCents = parseFloat(payment.amount) * 100;

  var noncePromise = () => new Promise((resolve) => { resolve("") });
  if (parsedAmountCents > 0 && parsedAmountCents > user.balance.balance_cents && !user.user.braintree_account) {
    noncePromise = braintreeNonce;
  }

  return dispatch => {
    initBraintreeWithToken().then(() => {
      noncePromise().then((nonce) => {
        dispatch({ type:  REQUEST_CHARGE_PAYMENT });
        ajax.payPendingCharge(email, token, payment.id, nonce)
            .then(response => {
              dispatch(refreshState(email, token));
              response.json().then(json => dispatch(receiveChargePayment(json)));
            })
            .catch(error => console.log(error));
      });
    });
  }
}

exports.declinePendingCharge = function(email, token, paymentId) {
  return dispatch => {
    dispatch({ type:  REQUEST_DECLINE_CHARGE });
    return ajax.declinePendingCharge(email, token, paymentId)
               .then(response => {
                 dispatch(refreshState(email, token));
                 response.json().then(json => dispatch(receiveDeclinePayment(json.data)));
               })
               .catch(error => console.log(error));
  }
}
