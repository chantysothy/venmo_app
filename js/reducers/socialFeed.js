import {
  REQUEST_SOCIAL_FEED,
  RECEIVE_SOCIAL_FEED
} from '../constants/actionTypes';

const defaultFeedState = {
  isFetching: false,
  socialFeed: [],
  privateFeed: []
};

export default function socialFeed(state = defaultFeedState, action) {
  switch (action.type) {
    case REQUEST_SOCIAL_FEED:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_SOCIAL_FEED:
      if (action.error) {
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          socialFeed: action.payments
        });
      }
    default:
      return state;
  }
}
