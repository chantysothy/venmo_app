import {
  REQUEST_CHARGES,
  RECEIVE_CHARGES,
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
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          charges: action.charges,
        });
      }
    default:
      return state;
  }
}
