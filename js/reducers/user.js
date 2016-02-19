import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
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
    default:
      return state;
  }
}
