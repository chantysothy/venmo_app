'use strict';

import { API_BASE } from '../constants/urls.js';
var queryString = require('query-string');

import React from 'react-native'
var url = require('url');

function POST(requestUrl, data) {
  var f = new FormData();
  for (var key in data) {
    f.append(key, data[key]);
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
