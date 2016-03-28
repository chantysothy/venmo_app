'use strict';

import React, {
  Component,
  Text,
  View,
  Navigator,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';

import { connect } from 'react-redux/native';
import { withEmailAndToken } from '../../utils/utils';
import TitleBar from '../titleBar/titleBar';
import Popup from 'react-native-popup';

import { withdraw } from '../../actions/withdrawalActions';
import { refreshState } from '../../actions/genericActions.js';

var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

var styles = require('./withdrawStyles.js');
var textStyles = require('../../shared/textStyles');

class Withdraw extends Component {
  constructor(props) {
    super(props);
    if (this.props.user.isFetching) {
      this.state = {
        account_number: "",
        sort_code: "",
        amount: "",
      };
    } else {
      this.state = this.props.user.params.user.bank;
      this.state.amount = this.props.user.params.balance.balance_cents > 0 ? "1.00" : "0.00";
    }
  }

  render() {
    var user = this.props.user.params.user;
    var bank = user ? user.bank : null;
    // prevent entering after decimal point
    var maxLength = this.state.amount.indexOf(".") == -1 ? 5 : this.state.amount.indexOf(".") + 4;

    var buttonDisabled = true;
    var iconStyle = [styles.icon, styles.buttonDisabled];
    var buttonContainerStyle = [styles.buttonContainer, styles.buttonContainerDisabled];

    if (this._withdrawalValid()) {
      buttonDisabled = false;
      iconStyle = [styles.icon];
      buttonContainerStyle = [styles.buttonContainer];
    }

    var withdrawTextInputStyles = [textStyles.text, styles.textInput, styles.withdrawInput];
    if (Platform.OS == 'android') {
      withdrawTextInputStyles.push({height: 60});
    }

    if (bank && bank.account_number && bank.sort_code) {
      var view =
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps scrollEnabled={false}>
            <View>
              <Text style={[textStyles.text, styles.info, styles.topInfo]}>
                Available balance: {this.props.user.params.balance.balance_formatted}
              </Text>
            </View>
            <View>
              <TextInput style={withdrawTextInputStyles}
                value={"£" + this.state.amount}
                keyboardType="numeric"
                ref="withdrawTextInput"
                autoFocus
                maxLength={maxLength}
                onChangeText={(amount) => this._changeAmount(amount)}/>
            </View>
            <Text style={[textStyles.text, styles.info, styles.bottomInfo]}>
              We'll be sending the money to
              account ending in {bank.account_number.substr(bank.account_number.length - 4)}.
            </Text>
            <Button containerStyle={buttonContainerStyle} onPress={() => this._requestWithdrawal()}
              styleDisabled={styles.buttonDisabled} disabled={buttonDisabled}
              style={[textStyles.text, styles.buttonText]} >
              <Icon style={iconStyle} name="lock-combination" size={20}/>
              Withdraw
            </Button>
          </ScrollView>
        </View>
    } else {
      var view =
        <View style={styles.container}>
          <Text style={[textStyles.text, styles.info, {marginBottom: 10}]}>
            You'll need to add your bank account first.
          </Text>
          <Button containerStyle={styles.buttonContainer} onPress={() => this._transitionToBankAccount()}
            style={[textStyles.text, styles.buttonText]} >
            <Icon style={iconStyle} name="lock-combination" size={20}/>
            Add bank account
          </Button>
        </View>
    }
    return(
      <View style={styles.outerContainer}>
        <TitleBar text="Withdraw" back={() => this.props.navigator.pop()} />
        {view}
        <Popup ref={(popup) => { this.popup = popup }}/>
      </View>
    );
  }

  _transitionToBankAccount() {
    this.props.navigator.push({
      id: 'EditBank'
    });
  }

  _requestWithdrawal() {
    var user = this.props.user.params;
    var bank = user.user ? user.user.bank : null;

    this.refs.withdrawTextInput.blur();
    this.props.dispatch(withdraw(user, {
      amount: this.state.amount.replace("£",""),
    }, () => {
      var email = user.user.email;
      var token = user.authentication_token;
      this.props.dispatch(refreshState(email, token));
      this.popup.tip({
        title: 'Thanks!',
        content: [
          `We've just sent £${this.state.amount} to account ${bank.account_number.substr(bank.account_number.length - 4)}. `,
          "You should receive it within 48h."],
        btn: {
          text: 'Okay',
          callback: () => {
            this.props.navigator.pop();
          },
        },
      });
    }));
  }

  _changeAmount(amount) {
    if (amount != "") {
      this.setState({
        amount: amount.replace("£",""),
      })
    }
  }

  _withdrawalValid() {
    var amountCents = parseFloat(this.state.amount) * 100
    if (amountCents <= this.props.user.params.balance.balance_cents && amountCents > 0) {
      return true;
    } else {
      return false;
    }
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
  };
}


export default connect(mapStateToProps)(Withdraw)
