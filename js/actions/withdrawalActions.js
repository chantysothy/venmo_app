import React from 'react-native';
var _ = require('lodash');

import {
  REQUEST_WITHDRAWAL,
  RECEIVE_WITHDRAWAL,
} from '../constants/actionTypes';

import * as ajax from '../shared/ajax.js';

function requestWithdrawal() {
  return {
    type: REQUEST_WITHDRAWAL
  };
}

function receiveWithdrawal(withdrawal, callback) {
  return dispatch => {
    dispatch({
      type: RECEIVE_WITHDRAWAL,
      withdrawal,
      receivedAt: Date.now(),
    });
    callback();
  }
}

exports.withdraw = function withdraw(user, withdrawal, callback) {
  var email = user.user.email;
  var token = user.authentication_token;
  var parsedAmountCents = parseFloat(withdrawal.amount) * 100;

  if (parsedAmountCents > 0 && parsedAmountCents <= user.balance.balance_cents) {
    return dispatch => {
      dispatch(requestWithdrawal());
        return ajax.withdraw(email, token, withdrawal)
        .then(response => {
          response.json()
          .then(json => dispatch(receiveWithdrawal(json.data, callback)))
        })
        .catch(error => console.log(error));
    }
  } else {
    console.log("withdrawal failed");
  }
}
