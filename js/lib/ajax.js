'use strict';

import { API_BASE } from '../constants/urls.js';

import React from 'react-native'
var url = require('url');

export function facebookCreateOrLogin(facebookId, facebookToken) {
  var f = new FormData();
  f.append('facebook_token', encodeURIComponent(facebookToken));
  f.append('facebook_id', encodeURIComponent(facebookId));

  var requestUrl = API_BASE + '/auth/login/'

  return(fetch(requestUrl, {
    method: 'post',
    body: f,
  }));
}
