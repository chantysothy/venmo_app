import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REQUEST_REFRESH_STATE,
  RECEIVE_REFRESH_STATE,
  LOGOUT,
} from '../constants/actionTypes';

const defaultUserState = {
  isFetching: false,
  params: {},
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        params: {},
      });
    case RECEIVE_LOGIN:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          params: action.user,
        });
      }
    case LOGOUT:
      return defaultUserState;

    case REQUEST_REFRESH_STATE:
      return state

    case RECEIVE_REFRESH_STATE:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          params: action.user,
        });
      }
    default:
      return state;
  }
}
