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
