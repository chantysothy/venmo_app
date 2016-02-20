import {
  REQUEST_USER_SEARCH,
  RECEIVE_USER_SEARCH,
  CLEAR_USER_SEARCH,
} from '../constants/actionTypes';

const defaultUserSearchState = {
  isFetching: false,
  results: [],
};

export default function user(state = defaultUserSearchState, action) {
  switch (action.type) {
    case REQUEST_USER_SEARCH:
      return Object.assign({}, state, {
        isFetching: true,
        results: [],
      });
    case RECEIVE_USER_SEARCH:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          results: action.results,
        });
      }
    case CLEAR_USER_SEARCH:
      return Object.assign({}, state, {
        isFetching: false,
        results: [],
      });
    default:
      return state;
  }
}
