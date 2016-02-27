import {
  REQUEST_REGISTER_PHONE_NUMBER,
  RECEIVE_REGISTER_PHONE_NUMBER,
  REQUEST_VERIFY_PHONE_NUMBER,
  RECEIVE_VERIFY_PHONE_NUMBER,
  RESET_VERIFY_PHONE_NUMBER,
} from '../constants/actionTypes';
import * as ajax from '../shared/ajax'
import React from 'react-native'

function handleError(error) {
  console.log(error);
}

function receiveRegisterPhoneNumber(parsedResponse) {
  if (parsedResponse.status === "failure"){
    return dispatch => {
      dispatch({
        type: RECEIVE_REGISTER_PHONE_NUMBER,
        error: parsedResponse.error,
        receivedAt: Date.now()
      });
    }
  } else {
    return dispatch => {
      dispatch({
        type: RECEIVE_REGISTER_PHONE_NUMBER,
        message: parsedResponse.message,
        receivedAt: Date.now(),
        pin: parsedResponse.pin
      });
    }
  }
}

function resetPhoneVerification(message){
  return dispatch => {
    dispatch({
      type: RESET_VERIFY_PHONE_NUMBER,
      message: message
    });
  }
}

function receiveVerifyPhoneNumber(parsedResponse) {
  if (parsedResponse.status === "failure"){
    if (parsedResponse.error === "More than 5 incorrect verification attempts") {
      return resetPhoneVerification(parsedResponse.error);
    } else {
      return dispatch => {
        dispatch({
          type: RECEIVE_VERIFY_PHONE_NUMBER,
          error: parsedResponse.error,
          receivedAt: Date.now()
        });
      }
    }
  } else {
    return dispatch => {
      dispatch({
        type: RECEIVE_VERIFY_PHONE_NUMBER,
        message: parsedResponse.message,
        receivedAt: Date.now(),
        pin: parsedResponse.pin
      });
    }
  }
}

exports.resetPhoneVerification = resetPhoneVerification;

exports.registerPhoneNumber = function(email, token, phone_number) {
  return dispatch => {
    dispatch({ type:  REQUEST_REGISTER_PHONE_NUMBER });

    return ajax.registerPhoneNumber(email, token, phone_number)
               .then( response => {
                 if (response.status == 200) {
                   response.json()
                     .then(receiveRegisterPhoneNumber)
                     .then(dispatch);
                 }
               })
               .catch(handleError);
  }
}

exports.verifyPhoneNumber = function(email, token, phone_number, pin) {
  return dispatch => {
    dispatch({ type:  REQUEST_VERIFY_PHONE_NUMBER });

    return ajax.verifyPhoneNumber(email, token, phone_number, pin)
               .then( response => {
                 response.json()
                   .then(receiveVerifyPhoneNumber)
                   .then(dispatch);
               })
               .catch(handleError);
  }
}
