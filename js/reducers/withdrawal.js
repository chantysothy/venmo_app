import {
  REQUEST_WITHDRAWAL,
  RECEIVE_WITHDRAWAL,
} from '../constants/actionTypes';


const defaultWithdrawalState = {
  isFetching: false,
  params: {},
};

export default function withdrawal(state = defaultWithdrawalState, action) {
  switch (action.type) {
    case REQUEST_WITHDRAWAL:
      return Object.assign({}, state, {
        isFetching: true,
        params: {},
      });
    case RECEIVE_WITHDRAWAL:
      if (action.error) {
        // we got problem yo
        return state
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          params: action.withdrawal,
        });
      }
    case CLEAR_WITHDRAWAL:
      return defaultWithdrawalState;
    default:
      return state;
  }
}
