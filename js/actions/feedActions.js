import {
  REQUEST_SOCIAL_FEED,
  RECEIVE_SOCIAL_FEED,
  REQUEST_PRIVATE_FEED,
  RECEIVE_PRIVATE_FEED,
} from '../constants/actionTypes';
import * as ajax from '../lib/ajax.js';
import React from 'react-native'

function handleError(error) {
  console.log("Encountered error in GET request for social feed.");
  console.log(error);
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
