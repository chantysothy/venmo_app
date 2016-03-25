import { REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT } from '../constants/actionTypes';
import * as ajax from '../shared/ajax.js';
import React from 'react-native'

var { NativeAppEventEmitter } = require('react-native');

var store = require('react-native-simple-store');

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function receiveLogin(status, user, error, navigator) {
  return dispatch => {
    if (status == 200) {
      store.save('email', user.user.email).then(() => {
        store.save('token', user.authentication_token).then(() => {
          if (user.user.phone_number === null) {
            navigator.push({
              id: 'PhoneVerification',
            });
          } else {
            navigator.push({
              id: 'Home',
            });
          }
        });
      });

      dispatch({
        type: RECEIVE_LOGIN,
        user,
        receivedAt: Date.now(),
      });
    } else {
      dispatch({
        type: RECEIVE_LOGIN,
        error: 'Invalid credentials'
      });

      if (error !== undefined) {
        NativeAppEventEmitter.emit("showPopup", {
          title: "Login error",
          content: [error],
          buttonText: "Okay",
        });
      }
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
    if (email === null || token === null) {
      return;
    }
    dispatch(requestLogin());
    return ajax.loginWithToken(email, token)
               .then(response => {
                   response.json()
                           .then(json => dispatch(receiveLogin(response.status, json.data, json.error, navigator)))
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
