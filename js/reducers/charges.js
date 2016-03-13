import {
  REQUEST_CHARGES,
  RECEIVE_CHARGES,
  REQUEST_REFRESH_STATE,
  RECEIVE_REFRESH_STATE,
} from '../constants/actionTypes';

const defaultChargesState = {
  isFetching: false,
  charges: [],
};

export default function socialFeed(state = defaultChargesState, action) {
  switch (action.type) {
    case REQUEST_CHARGES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CHARGES:
    case RECEIVE_REFRESH_STATE:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          charges: action.charges,
        });
      }
    case REQUEST_REFRESH_STATE:
      return state;
    default:
      return state;
  }
}
