import { REQUEST_USER_SEARCH, RECEIVE_USER_SEARCH, CLEAR_USER_SEARCH } from '../constants/actionTypes';
import * as ajax from '../shared/ajax.js';
import React from 'react-native'

function requestUserSearch() {
  return {
    type: REQUEST_USER_SEARCH,
  };
}

function receiveUserSearch(results) {
  return dispatch => {
    dispatch({
      type: RECEIVE_USER_SEARCH,
      results,
      receivedAt: Date.now(),
    });
  }
}

exports.fetchUsersSearch = function fetchUsersSearch(email, token, query) {
  return dispatch => {
    dispatch(requestUserSearch());
    return ajax.searchUsers(email, token, query)
    .then(response => {
      response.json()
      .then(json => dispatch(receiveUserSearch(json.results)))
    })
    .catch(error => console.log(error));
  }
}

exports.clearUsersSearch = function clearUsersSearch() {
  return({
    type: CLEAR_USER_SEARCH,
  });
}
