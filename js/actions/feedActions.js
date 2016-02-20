import { REQUEST_SOCIAL_FEED, RECEIVE_SOCIAL_FEED } from '../constants/actionTypes';
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

exports.fetchSocialFeed = function(email, token, navigator) {
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
