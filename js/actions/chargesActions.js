import {
  REQUEST_CHARGES,
  RECEIVE_CHARGES,
  REQUEST_CHARGE_PAYMENT,
  RECEIVE_CHARGE_PAYMENT,
  REQUEST_DECLINE_PAYMENT,
  RECEIVE_DECLINE_PAYMENT,
} from '../constants/actionTypes';

import * as ajax from '../shared/ajax.js';
import React from 'react-native'

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
  return dispatch => {
    dispatch({
      type: RECEIVE_CHARGE_PAYMENT,
      receivedAt: Date.now()
    });
  }
}

function receiveDeclinePayment(parsedResponse) {
  return dispatch => {
    dispatch({
      type: RECEIVE_DECLINE_PAYMENT,
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

exports.payPendingCharge = function(email, token, paymentId) {
  var nonce = "fake-valid-nonce"

  return dispatch => {
    dispatch({ type:  REQUEST_CHARGE_PAYMENT });
    return ajax.payPendingCharge(email, token, paymentId, nonce)
               .then(response => {
                 dispatch(fetchCharges(email, token));
                 dispatch(fetchSocialFeed(email, token));
                 dispatch(fetchPrivateFeed(email, token));
                 response.json().then(json => dispatch(receiveChargePayment(json.data)));
               })
               .catch(error => console.log(error));
  }
}

exports.declinePendingCharge = function(email, token, paymentId) {
  var nonce = "fake-valid-nonce"

  return dispatch => {
    dispatch({ type:  REQUEST_DECLINE_PAYMENT });
    return ajax.declinePendingCharge(email, token, paymentId)
               .then(response => {
                 dispatch(fetchCharges(email, token));
                 dispatch(fetchSocialFeed(email, token));
                 dispatch(fetchPrivateFeed(email, token));
                 response.json().then(json => dispatch(receiveChargePayment(json.data)));
               })
               .catch(error => console.log(error));
  }
}
