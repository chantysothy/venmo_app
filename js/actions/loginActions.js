import { REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT } from '../constants/actionTypes';
import * as ajax from '../lib/ajax.js';
import React from 'react-native'

var ReactBridge = React.NativeModules.ReactBridge;

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function receiveLogin(status, user, navigator) {
  return dispatch => {
    if (status == 200) {
      navigator.push({
        id: 'Home',
      });
    }

    dispatch({
      type: RECEIVE_LOGIN,
      user,
      receivedAt: Date.now(),
    });
  }
}

exports.fetchFacebookLogin = function fetchFacebookLogin(id, token, navigator) {
  return dispatch => {
    dispatch(requestLogin());
    return ajax.facebookCreateOrLogin(id, token)
    .then(response => {
      response.json()
      .then(json => dispatch(receiveLogin(response.status, json.data, navigator)))
    })
    .catch(error => console.log(error));
  }
}

exports.logout = function(navigator) {
  navigator.pop();
  UserDefaults.removeItemForKey('email')
  .then(result => {
    UserDefaults.removeItemForKey('token')
  });

  return {
    type: LOGOUT
  }
}
