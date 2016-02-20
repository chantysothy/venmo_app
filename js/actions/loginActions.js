import { REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT } from '../constants/actionTypes';
import * as ajax from '../shared/ajax.js';
import React from 'react-native'

var store = require('react-native-simple-store');

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function receiveLogin(status, user, navigator) {
  return dispatch => {
    if (status == 200) {
      store.save('email', user.user.email).then(() => {
        store.save('token', user.authentication_token).then(() => {
          navigator.push({
            id: 'Home',
          });
        });
      });

      dispatch({
        type: RECEIVE_LOGIN,
        user,
        receivedAt: Date.now(),
      });
    }
  }
}

exports.fetchFacebookLogin = function fetchFacebookLogin(token, navigator) {
  return dispatch => {
    dispatch(requestLogin());
    return ajax.facebookCreateOrLogin(token)
    .then(response => {
      response.json()
      .then(json => dispatch(receiveLogin(response.status, json.data, navigator)))
    })
    .catch(error => console.log(error));
  }
}

exports.fetchLoginWithToken = function fetchLoginWithToken(email, token, navigator) {
  return dispatch => {
    dispatch(requestLogin());
    return ajax.loginWithToken(email, token)
    .then(response => {
      response.json()
      .then(json => dispatch(receiveLogin(response.status, json.data, navigator)))
    })
    .catch(error => console.log(error));
  }
}

exports.logout = function(navigator) {
  navigator.pop();
  store.delete('email')
  .then(result => {
    store.delete('token')
  });

  return {
    type: LOGOUT
  }
}
