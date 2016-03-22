import {
  REQUEST_CHARGES,
  RECEIVE_CHARGES,
  REQUEST_REFRESH_STATE,
  RECEIVE_REFRESH_STATE,
  REQUEST_CHARGE_PAYMENT,
  RECEIVE_CHARGE_PAYMENT,
  REQUEST_DECLINE_CHARGE,
  RECEIVE_DECLINE_CHARGE,
} from '../constants/actionTypes';

const defaultChargesState = {
  isFetching: false,
  charges: [],
  payingOrDecliningCharge: false,
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

    case RECEIVE_CHARGE_PAYMENT:
      return Object.assign({}, state, {
        payingOrDecliningCharge: false
      });
    case RECEIVE_DECLINE_CHARGE:
      return Object.assign({}, state, {
        payingOrDecliningCharge: false
      });

    case REQUEST_CHARGE_PAYMENT:
      return Object.assign({}, state, {
        payingOrDecliningCharge: true
      });
    case REQUEST_DECLINE_CHARGE:
      return Object.assign({}, state, {
        payingOrDecliningCharge: true
      });

    default:
      return state;
  }
}
