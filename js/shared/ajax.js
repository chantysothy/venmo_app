'use strict';

import { API_BASE } from '../constants/urls.js';
var queryString = require('query-string');

import React from 'react-native'
var url = require('url');

function formatData(data){
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
  return f;
}

function PUT(requestUrl, data) {
  return fetch(requestUrl, {
    method: 'put',
    body: formatData(data)
  });
}

function POST(requestUrl, data) {
  return fetch(requestUrl, {
    method: 'post',
    body: formatData(data)
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

export function registerPhoneNumber(email, authentication_token, phone_number) {
  var requestUrl = API_BASE +'/auth/register_phone_number'
  return POST(requestUrl, { email, authentication_token, phone_number });
}

export function verifyPhoneNumber(email, authentication_token, phone_number, pin) {
  var requestUrl = API_BASE +'/auth/verify_phone_number'
  return POST(requestUrl, { email, authentication_token, phone_number, pin });
}

export function getPublicFeed(email, authentication_token) {
  var requestUrl = API_BASE + '/social/public_feed';
  return GET(requestUrl, { email, authentication_token } );
}

export function getSocialFeed(email, authentication_token) {
  var requestUrl = API_BASE + '/social/friend_feed';
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

export function payPendingCharge(email, authentication_token, payment_id, nonce){
  var requestUrl = API_BASE + '/payments/' + payment_id.toString() + '/pay_pending_charge';
  return PUT(requestUrl, {
    email,
    authentication_token,
    payment_method_nonce: nonce,
  });
}

