import {
  REQUEST_PAYMENT,
  RECEIVE_LOGIN,
  CLEAR_PAYMENT
} from '../constants/actionTypes';


const defaultPaymentState = {
  isFetching: false,
  params: {},
};

export default function user(state = defaultUserState, action) {
  switch (action.type) {
    case REQUEST_PAYMENT:
      return Object.assign({}, state, {
        isFetching: true,
        params: {},
      });
    case RECEIVE_PAYMENT:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          params: action.payment,
        });
      }
    case CLEAR_PAYMENT:
      return defaultUserState;
    default:
      return state;
  }
}
