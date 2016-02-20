import {
  REQUEST_SOCIAL_FEED,
  RECEIVE_SOCIAL_FEED
} from '../constants/actionTypes';

const defaultSocialFeedState = {
  isFetching: false,
  friendPayments: []
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
    default:
      return state;
  }
}
