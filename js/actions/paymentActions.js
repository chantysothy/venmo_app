import React from 'react-native';
var _ = require('lodash');

import {
  REQUEST_PAYMENT,
  RECEIVE_PAYMENT,
  CLEAR_PAYMENT
} from '../constants/actionTypes';

import * as ajax from '../shared/ajax.js';

import { refreshState } from './genericActions.js';

import { braintreeNonce } from '../shared/braintree';

function requestPayment() {
  return {
    type: REQUEST_PAYMENT
  };
}

function receivePayment(payment, navigator) {
  var popTo = _.find(navigator.getCurrentRoutes(), (elem) => elem.id === "Home");
  navigator.popToRoute(popTo);

  return dispatch => {
    dispatch({
      type: RECEIVE_PAYMENT,
      payment,
      receivedAt: Date.now(),
    });
  }
}

exports.pay = function pay(user, payment, navigator) {
  var email = user.user.email;
  var token = user.authentication_token;
  var parsedAmountCents = parseFloat(payment.amount) * 100;

  var noncePromise = () => new Promise((resolve) => { resolve("") });

  if (parsedAmountCents > 0 && parsedAmountCents > user.balance.balance_cents && !user.user.braintree_account) {
    noncePromise = braintreeNonce;
  }

  return dispatch => {
    noncePromise().then((nonce) => {
      dispatch(requestPayment());
      return ajax.pay(email, token, payment, nonce)
                 .then(response => {
                   dispatch(refreshState(email,token)).then(() => {
                       response.json()
                       .then(json => dispatch(receivePayment(json.data, navigator)))
                   });
                 })
                 .catch(error => console.log(error));
    });
  }
}

exports.clearPayment = function clearPayment() {
  return {
    type: CLEAR_PAYMENT,
  }
}
