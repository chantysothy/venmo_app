import {
  REQUEST_PAYMENT,
  RECEIVE_PAYMENT,
  CLEAR_PAYMENT
} from '../constants/actionTypes';

import * as ajax from '../shared/ajax.js';
import React from 'react-native'

function requestPayment() {
  return {
    type: REQUEST_PAYMENT
  };
}

function receivePayment(payment) {
  return dispatch => {
    dispatch({
      type: RECEIVE_PAYMENT,
      payment,
      receivedAt: Date.now(),
    });
  }
}

exports.pay = function pay(email, token, toId, note, amount) {
  var payment = {
    note,
    amount,
    other_id: toId,
    audience: "public",
  };
  var nonce = "fake-valid-nonce"

  return dispatch => {
    dispatch(requestPayment());
    return ajax.pay(email, token, payment, nonce)
    .then(response => {
      response.json()
      .then(json => dispatch(receivePayment(json.data)))
    })
    .catch(error => console.log(error));
  }
}

exports.clearPayment = function clearPayment() {
  return {
    type: CLEAR_PAYMENT,
  }
}
