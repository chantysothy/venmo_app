import { REQUEST_USER, RECEIVE_USER } from '../constants/actionTypes';
import * as ajax from '../shared/ajax.js';
import React from 'react-native'

function requestUser() {
  return {
    type: REQUEST_USER,
  };
}

function receiveUser(parsed, navigator) {
  return dispatch => {
    dispatch({
      type: RECEIVE_USER,
      user: parsed.data,
      receivedAt: Date.now(),
    });
    navigator.pop();
  }
}

exports.updateUser = function(user, changeset, navigator) {
  var email = user.user.email;
  var token = user.authentication_token;

  return dispatch => {
    dispatch(requestUser());
    return ajax.updateUser(email, token, changeset)
    .then(response => {
      response.json()
      .then(json => dispatch(receiveUser(json, navigator)))
    })
    .catch(error => console.log(error));
  }
}

exports.updateOnesignalId = function(email, token, onesignal_id) {
  return dispatch => {
    return ajax.updateUser(email, token, {onesignal_id});
  }
}
