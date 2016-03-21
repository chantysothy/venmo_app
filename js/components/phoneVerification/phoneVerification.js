'use strict';

import React, {
  Platform,
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';

import TitleBar from '../titleBar/titleBar';
import { registerPhoneNumber, verifyPhoneNumber, resetPhoneVerification } from '../../actions/phoneVerificationActions.js';
import { withEmailAndToken } from '../../utils/utils';
import colors from '../../constants/colors';
import Popup from 'react-native-popup';
var PushNotificationManager = require('../../utils/pushNotificationManager');

var GridView = require('react-native-grid-view');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');
var Animatable = require('react-native-animatable');

var styles = require('./phoneVerificationStyles.js');
var textStyles = require('../../shared/textStyles');

var LoadingOverlay = require('../../shared/loadingOverlay');

class PhoneVerification extends Component {
  constructor(props) {
    super(props);

    this.numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", null, "0", "back"];
    this.state = {
      phoneNumber: "",
      pin: "",
    };
  }
  render() {
    var user = this.props.user.params.user;
    var phoneNumber = this.state.phoneNumber;
    var {
      isRegistering,
      registeredPhoneNumber,
      isVerifying,
      verifiedPhoneNumber,
      message
    } = this.props.phoneVerification;

    if (this.props.user.params.user.phone_number) {
      // user has phone number registered, is changing number
      var backFunction = () => this.props.navigator.pop();
      var backView = <Icon name="arrow-left-c" size={40} color="white"/>;
    }

    if (!registeredPhoneNumber) {
      var forwardFunction = () => this._registerPhoneNumber();
      var forwardDisabled = true;
      var forwardView = <Icon name="ios-checkmark-outline" size={40} color={colors.lightGreen}/>;

      if (phoneNumber.length == 0) {
        var placeholderNumberStyle = styles.placeholderNumber;
        var numberToDisplay = "Enter your mobile number";
      } else {
        if (phoneNumber[0] === "0" && phoneNumber.length > 5) {
          var numberToDisplay = phoneNumber.slice(0, 5) + " " + phoneNumber.slice(5);
          if (phoneNumber.length === 11) {
            forwardDisabled = false;
            forwardView = <Icon name="ios-checkmark-outline" size={40} color="white"/>;
          }
        } else if (phoneNumber[0] !== "0" && phoneNumber.length > 4) {
          var numberToDisplay = phoneNumber.slice(0, 4) + " " + phoneNumber.slice(4);
          if (phoneNumber.length === 10) {
            forwardDisabled = false;
            forwardView = <Icon name="ios-checkmark-outline" size={40} color="white"/>;
          }
        } else {
          var numberToDisplay = phoneNumber;
        }
      }
    } else {
      var backFunction = () => this._resetPhoneVerification();
      var backView = <Icon name="arrow-left-c" size={40} color="white"/>;
      var pin = this.state.pin;
      if (pin.length == 0) {
        var placeholderNumberStyle = styles.placeholderNumber;
        var numberToDisplay = "Enter your pin";
      } else {
        var numberToDisplay = this.state.pin;
      }
    }

    var loadingIndicatorVisible = this.props.phoneVerification.isRegistering || this.props.phoneVerification.isVerifying;
    var loadingOverlay = (<LoadingOverlay isVisible={loadingIndicatorVisible} />);
    if (Platform.OS === 'android') {
      if (loadingIndicatorVisible) {
        var androidLoadingOverlay = loadingOverlay;
      } else {
        var androidLoadingOverlay = null;
      }
      var iosLoadingOverlay = null;
    } else if (Platform.OS === 'ios') {
      var iosLoadingOverlay = loadingOverlay;
      var androidLoadingOverlay = null;
    }

    return (
      <View>
        { iosLoadingOverlay }
        <TitleBar text="Verification" forwardView={forwardView}
          forward={forwardFunction} forwardDisabled={forwardDisabled}
          back={backFunction} backView={backView}/>
        <View style={styles.container}>
          <Animatable.View ref="numberTextContainer" style={styles.numberTextContainer} easing="ease-in-out">
            <Text style={[textStyles.text, styles.numberText, placeholderNumberStyle]}>{numberToDisplay}</Text>
          </Animatable.View>
          <View style={styles.messagesContainer}>
            <Text style={[textStyles.text, styles.messageText]}>
              { message ? message : "Before sending or receiving money, you'll need to verify your mobile number." }
            </Text>
          </View>
          <GridView items={this.numberButtons} itemsPerRow={3} renderItem={(item) => this._renderNumberButton(item)} scrollEnabled={false} style={styles.numberButtonsContainer}/>
        </View>
        {androidLoadingOverlay}
        <Popup ref={(popup) => { this.popup = popup }}/>
      </View>
    );
  }

  _registerPhoneNumber() {
    if (!this.props.isRegistering) {
      withEmailAndToken((email, token) => {
        this.props.dispatch(registerPhoneNumber(email, token, this.state.phoneNumber));
      });
    }
  }

  _resetPhoneVerification() {
    this.props.dispatch(resetPhoneVerification(''));
  }

  _verifyPhoneNumber() {
    withEmailAndToken((email, token) => {
      this.props.dispatch(verifyPhoneNumber(email, token, this.state.phoneNumber, this.state.pin, () => {
        this.popup.confirm({
          title: 'Get notified of payments',
          content: [
            "When a friend sends you money, we'd like to let you know.",
            "We'll never notify you otherwise.",
          ],
          ok: {
            text: 'Notify me',
            callback: () => {
              PushNotificationManager.registerForPushNotifications();

              this.props.navigator.push({
                id: 'Home',
              });
            },
          },
          cancel: {
            text: 'No thanks',
            callback: () => {
              this.props.navigator.push({
                id: 'Home',
              });
            },
          }
        });

      }));
    });
  }

  _onNumberButtonPress(item) {
    if (this.props.phoneVerification.registeredPhoneNumber) {
      if (this.state.pin.length < 4 || item === "back") {
        this.setState({
          pin: item === "back" ? this.state.pin.slice(0, -1) : this.state.pin + item,
        }, () => {
          if (this.state.pin.length === 4) {
            this._verifyPhoneNumber();
          }
        });
      }

    } else {
      // user is entering phone number
      var phoneNumber = this.state.phoneNumber;
      if ((phoneNumber.length === 11 && phoneNumber[0] === "0" && item !== "back") ||
          (phoneNumber.length === 10 && phoneNumber[0] !== "0" && item !== "back")) {
        this.refs.numberTextContainer.wobble(500)
      } else {
        this.setState({
          phoneNumber: item === "back" ? this.state.phoneNumber.slice(0, -1) : this.state.phoneNumber + item,
        });
      }
    }
  }

  _renderNumberButton(item) {
    if(item === "back") {
      var text = <Icon name="backspace-outline" size={40} color="white"/>;
    } else if (item === null) {
      return(<View key="null" style={styles.numberButton}/>);
    } else {
      var text = <Text style={[textStyles.text, styles.numberButtonText]}>{item}</Text>;
    }
    return(
      <TouchableHighlight key={item} activeOpacity={.9} underlayColor={"#0b777f"}
        onPress={() => this._onNumberButtonPress(item)} style={styles.numberButton}>
        {text}
      </TouchableHighlight>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.user,
    phoneVerification: state.phoneVerification
  };
}

export default connect(mapStateToProps)(PhoneVerification)
