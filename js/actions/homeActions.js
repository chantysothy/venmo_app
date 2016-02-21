import {
  SWITCH_TO_SOCIAL_FEED,
  SWITCH_TO_PUBLIC_FEED,
  SWITCH_TO_PRIVATE_PROFILE
} from '../constants/actionTypes';

import React from 'react-native'


exports.switchToSocialFeed = function() {
  return dispatch => {
    dispatch({ type: SWITCH_TO_SOCIAL_FEED });
  }
}
exports.switchToPublicFeed = function() {
  return dispatch => {
    dispatch({ type: SWITCH_TO_PUBLIC_FEED });
  }
}
exports.switchToPrivateProfile = function() {
  return dispatch => {
    dispatch({ type: SWITCH_TO_PRIVATE_PROFILE });
  }
}

function receiveSocialFeed(parsedResponse) {
  return dispatch => {
    dispatch({
      type: RECEIVE_SOCIAL_FEED,
      payments: parsedResponse.payments,
      receivedAt: Date.now()
    });
  }
}

function receivePrivateFeed(parsedResponse) {
  return dispatch => {
    dispatch({
      type: RECEIVE_PRIVATE_FEED,
      payments: parsedResponse.payments,
      receivedAt: Date.now()
    });
  }
}

exports.fetchSocialFeed = function(email, token) {
  return dispatch => {
    dispatch({ type:  REQUEST_SOCIAL_FEED });

    return ajax.getSocialFeed(email, token)
               .then( response => {
                 if (response.status == 200) {
                   response.json()
                     .then(receiveSocialFeed)
                     .then(dispatch);
                 }
               })
               .catch(handleError);
  }
}

exports.fetchPrivateFeed = function(email, token) {
  return dispatch => {
    dispatch({ type:  REQUEST_PRIVATE_FEED });

    return ajax.getSocialFeed(email, token)
               .then( response => {
                 if (response.status == 200) {
                   response.json()
                     .then(receivePrivateFeed)
                     .then(dispatch);
                 }
               })
               .catch(handleError);
  }
}

