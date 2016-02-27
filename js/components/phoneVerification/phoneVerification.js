'use strict';

import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';

import TitleBar from '../titleBar/titleBar';
import { registerPhoneNumber, verifyPhoneNumber, resetPhoneVerification } from '../../actions/phoneVerificationActions.js';
import { withEmailAndToken } from '../../utils/utils';


var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

var styles = require('./phoneVerificationStyles.js');
var textStyles = require('../../shared/textStyles');

class PhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ''
    };
  }
  render() {
    var user = this.props.user.params.user;
    var { isRegistering, registeredPhoneNumber, isVerifying, verifiedPhoneNumber, message } = this.props.phoneVerification;

    if (!registeredPhoneNumber) {
      // need to register a phone number
      var dialog = (
          <View style={styles.dialog}>
            <TextInput
              style={[textStyles.text, styles.textInput]}
              onChangeText={this._onChangePhone.bind(this)}
              keyboardType='phone-pad'
              placeholder="Phone number"
              autoCapitalize="none"
              autoFocus={true}
              value={this.state.phoneNumber}
            />
            <TouchableHighlight
              underlayColor="green"
              style={styles.verifyButtonContainer}
              onPress={this._registerPhoneNumber.bind(this)}>
              <Text style={styles.verifyButton}>
                Register
              </Text>
            </TouchableHighlight>
          </View>
      )
    } else {
      if (!verifiedPhoneNumber) {
        // need to verify the phone number
        var dialog = (
          <View style={styles.dialog}>
            <TextInput
              style={[textStyles.text, styles.textInput]}
              onChangeText={this._onChangePin.bind(this)}
              keyboardType='numeric'
              placeholder="PIN number"
              autoCapitalize="none"
              autoFocus={true}
              value={this.state.pin}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor="green"
                style={styles.verifyButtonContainer}
                onPress={this._resetPhoneVerification.bind(this)}>
                <Text style={styles.verifyButton}>
                  Back
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="green"
                style={styles.verifyButtonContainer}
                onPress={this._verifyPhoneNumber.bind(this)}>
                <Text style={styles.verifyButton}>
                  Verify
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )
      } else {
        // phone was verified!!
        var dialog = (
          <View style={styles.dialog}>
            <Text style={[textStyles.text, styles.explanation]}> Phone number verified! </Text>
            <TouchableHighlight
              underlayColor="green"
              style={styles.verifyButtonContainer}
              onPress={this._continueToHome.bind(this)}>
              <Text style={styles.verifyButton}>
                Continue
              </Text>
            </TouchableHighlight>
          </View>
        )
      }
    }

    return (
      <View style={styles.container}>
        <TitleBar text="Verification"/>
        <View style={styles.body}>
          <Text style={[textStyles.text, styles.explanation]}>
            We're almost done!
            We just need to verify your phone number.
          </Text>
          { dialog }
          <Text>
            { message }
          </Text>
          <Text>
            REMOVE ME. { this.props.phoneVerification.pin }
          </Text>
        </View>
      </View>
    );
  }

  _onChangePhone(t) {
    this.setState({
      phoneNumber: t
    });
  }

  _onChangePin(t) {
    this.setState({
      phoneNumber: this.state.phoneNumber,
      pin: t,
    });
  }

  _registerPhoneNumber() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(registerPhoneNumber(email, token, this.state.phoneNumber));
    });
  }

  _resetPhoneVerification() {
    this.props.dispatch(resetPhoneVerification(''));
  }

  _verifyPhoneNumber() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(verifyPhoneNumber(email, token, this.state.phoneNumber, this.state.pin));
    });
  }

  _continueToHome() {
    this.props.dispatch(resetPhoneVerification(''));
    this.props.navigator.push({
      id: 'Home'
    });
  }
}


function mapStateToProps(state){
  return {
    user: state.user,
    phoneVerification: state.phoneVerification
  };
}

export default connect(mapStateToProps)(PhoneVerification)
