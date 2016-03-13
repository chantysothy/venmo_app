import { REQUEST_REFRESH_STATE, RECEIVE_REFRESH_STATE} from '../constants/actionTypes';
import * as ajax from '../shared/ajax.js';
import React from 'react-native'

function receiveRefreshState(parsedResponse) {
  return dispatch => {
    dispatch({
      type: RECEIVE_REFRESH_STATE,
      friendPayments: parsedResponse.friend_feed,
      privatePayments: parsedResponse.private_feed,
      publicPayments: parsedResponse.public_feed,
      user: parsedResponse.user.data,
      charges: parsedResponse.charges,
      receivedAt: Date.now(),
    });
  }
}

exports.refreshState = function(email, token) {
  return dispatch => {
    dispatch({type: REQUEST_REFRESH_STATE });
    return ajax.refreshState(email, token)
    .then(response => {
      response.json()
      .then(json => dispatch(receiveRefreshState(json)))
    })
    .catch(error => console.log(error));
  }
}
