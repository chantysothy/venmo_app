import {
  REQUEST_REGISTER_PHONE_NUMBER,
  RECEIVE_REGISTER_PHONE_NUMBER,
  REQUEST_VERIFY_PHONE_NUMBER,
  RECEIVE_VERIFY_PHONE_NUMBER,
  RESET_VERIFY_PHONE_NUMBER,
} from '../constants/actionTypes';

const defaultPhoneVerificationState = {
  isRegistering: false,
  registeredPhoneNumber: false,
  isVerifying: false,
  verifiedPhoneNumber: false,
  message: ""
};

export default function phoneVerification(state = defaultPhoneVerificationState, action) {
  switch (action.type) {
    case REQUEST_REGISTER_PHONE_NUMBER:
      return Object.assign({}, state, {
        isRegistering: true,
        registeredPhoneNumber: false
      });
    case RECEIVE_REGISTER_PHONE_NUMBER:
      if (action.error) {
        return Object.assign({}, state, {
          isRegistering: false,
          registeredPhoneNumber: false,
          isVerifying: false,
          verifiedPhoneNumber: false,
          message: action.error
        });
      } else {
        return Object.assign({}, state, {
          isRegistering: false,
          registeredPhoneNumber: true,
          isVerifying: false,
          verifiedPhoneNumber: false,
          message: action.message,
          pin: action.pin
        });
      }

    case RESET_VERIFY_PHONE_NUMBER:
      return Object.assign({}, state, {
          isRegistering: false,
          registeredPhoneNumber: false,
          isVerifying: false,
          verifiedPhoneNumber: false,
          message: action.message,
      });

    case REQUEST_VERIFY_PHONE_NUMBER:
      return Object.assign({}, state, {
          isVerifying: true,
          verifiedPhoneNumber: false,
      });
    case RECEIVE_VERIFY_PHONE_NUMBER:
      if (action.error) {
        return Object.assign({}, state, {
          isRegistering: false,
          registeredPhoneNumber: true,
          isVerifying: false,
          verifiedPhoneNumber: false,
          message: action.error
        });
      } else {
        return Object.assign({}, state, {
          isRegistering: false,
          registeredPhoneNumber: true,
          isVerifying: false,
          verifiedPhoneNumber: true,
        });
      }
    default:
      return state;
  }
}
