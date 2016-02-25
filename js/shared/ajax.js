'use strict';

import { API_BASE } from '../constants/urls.js';
var queryString = require('query-string');

import React from 'react-native'
var url = require('url');

function POST(requestUrl, data) {
  var f = new FormData();
  for (var key in data) {
    if (typeof data[key] === "object") {
      for (var innerKey in data[key]) {
        f.append(`${key}[${innerKey}]`, data[key][innerKey]);
      }
    } else {
      f.append(key, data[key]);
    }
  }

  return fetch(requestUrl, {
    method: 'post',
    body: f
  });
}

function GET(requestUrl, data) {
  return fetch(requestUrl + '?' + queryString.stringify(data), { method: 'get' } );
}

export function facebookCreateOrLogin(facebookToken) {
  var requestUrl = API_BASE + '/auth/login/'
  return POST(requestUrl, { facebook_token: encodeURIComponent(facebookToken) });
}

export function loginWithToken(email, authentication_token) {
  var requestUrl = API_BASE + '/auth/login_with_token/';
  return POST(requestUrl, { email, authentication_token });
}

export function getSocialFeed(email, authentication_token) {
  var requestUrl = API_BASE + '/social/feed';
  return GET(requestUrl, { email, authentication_token } );
}

export function getPrivateFeed(email, authentication_token) {
  var requestUrl = API_BASE + '/social/private_feed';
  return GET(requestUrl, { email, authentication_token } );
}

export function getCharges(email, authentication_token) {
  var requestUrl = API_BASE + '/payments/my_charges';
  return GET(requestUrl, { email, authentication_token } );
}

export function searchUsers(email, authentication_token, query) {
  var requestUrl = API_BASE + '/users/search/'
  return GET(requestUrl, { email, authentication_token, query } );
}

export function pay(email, authentication_token, paymentParams, nonce) {
  var requestUrl = API_BASE + '/payments/'
  return POST(requestUrl, {
    email,
    authentication_token,
    payment_method_nonce: nonce,
    payment: paymentParams,
  });
}

