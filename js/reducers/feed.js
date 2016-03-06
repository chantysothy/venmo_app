import {
  REQUEST_SOCIAL_FEED,
  RECEIVE_SOCIAL_FEED,
  REQUEST_PRIVATE_FEED,
  RECEIVE_PRIVATE_FEED,
  REQUEST_PUBLIC_FEED,
  RECEIVE_PUBLIC_FEED,
  REQUEST_REFRESH_STATE,
  RECEIVE_REFRESH_STATE,
} from '../constants/actionTypes';

const PLACE_HOLDER = {
  isPlaceholder: true
};

const PLACE_HOLDER_PAYMENTS = [];
for (var i = 0; i < 15; i++) {
  PLACE_HOLDER_PAYMENTS.push({
    isPlaceholder: true,
    payment: { id: i },
    payee: {},
    payer: {},
  });
}

const defaultSocialFeedState = {
  isFetching: false,
  friendPayments: PLACE_HOLDER_PAYMENTS,
  privatePayments: PLACE_HOLDER_PAYMENTS,
  publicPayments: PLACE_HOLDER_PAYMENTS,
};

export default function socialFeed(state = defaultSocialFeedState, action) {
  switch (action.type) {
    case REQUEST_SOCIAL_FEED:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_SOCIAL_FEED:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          friendPayments: action.payments,
        });
      }

    case REQUEST_PRIVATE_FEED:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PRIVATE_FEED:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          privatePayments: action.payments
        });
      }

    case REQUEST_PUBLIC_FEED:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PUBLIC_FEED:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          publicPayments: action.payments
        });
      }

    case REQUEST_REFRESH_STATE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_REFRESH_STATE:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          publicPayments: action.publicPayments,
          privatePayments: action.privatePayments,
          friendPayments: action.friendPayments,
        });
      }
    default:
      return state;
  }
}
