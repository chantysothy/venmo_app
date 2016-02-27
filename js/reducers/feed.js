import {
  REQUEST_SOCIAL_FEED,
  RECEIVE_SOCIAL_FEED,
  REQUEST_PRIVATE_FEED,
  RECEIVE_PRIVATE_FEED,
  REQUEST_PUBLIC_FEED,
  RECEIVE_PUBLIC_FEED,
} from '../constants/actionTypes';

const defaultSocialFeedState = {
  isFetching: false,
  friendPayments: [],
  privatePayments: [],
  publicPayments: [],
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
    default:
      return state;
  }
}
