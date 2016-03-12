'use strict';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  Navigator,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux/native';
import { updateUser } from '../../actions/userActions';
import TitleBar from '../titleBar/titleBar';

var Icon = require('react-native-vector-icons/Ionicons');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

var styles = require('./withdrawStyles.js');
var textStyles = require('../../shared/textStyles');

class EditBank extends Component {
  constructor(props) {
    super(props);
    if (this.props.user.isFetching) {
      this.state = {
        accountNumber: null,
        sortCode: null,
        accountNumberConfirmed: null,
      };
    } else {
      this.state = {
        sortCode: this.props.user.params.user.bank.sort_code,
        accountNumber: this.props.user.params.user.bank.account_number,
        accountNumberConfirmed: this.props.user.params.user.bank.account_number,
      };
    }
  }

  render() {
    var sortCode = this.state.sortCode;
    var accountNumber = this.state.accountNumber;
    var accountNumberConfirmed = this.state.accountNumberConfirmed;
    var buttonDisabled = true;
    var iconStyle = [styles.icon, styles.buttonDisabled];
    var buttonContainerStyle = [styles.buttonContainer, styles.buttonContainerDisabled];

    if (sortCode && sortCode.length == 6 &&
        accountNumber && accountNumber.length == 8 &&
        accountNumber == accountNumberConfirmed) {
      buttonDisabled = false;
      iconStyle = [styles.icon];
      buttonContainerStyle = [styles.buttonContainer];
    }

    return(
      <View style={styles.container}>
        <TitleBar text="Bank Details" back={() => this.props.navigator.pop()} />
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput style={[textStyles.text, styles.textInput, styles.sortCodeField]}
              value={sortCode}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="Sort code"
              autoFocus={!sortCode || (!!sortCode && !!accountNumber)}
              onChangeText={(sc) => {
                if (sc.length == 6) { this.refs.accountNumberField.focus() };
                this.setState({sortCode: sc});
              }} />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={[textStyles.text, styles.textInput, styles.accountNumberField]}
              value={accountNumber}
              keyboardType="number-pad"
              ref="accountNumberField"
              maxLength={8}
              placeholder="Account number"
              autoFocus={sortCode && !accountNumber}
              onChangeText={(an) => {
                if (an.length === 8) { this.refs.accountNumberConfirmedField.focus() }
                this.setState({accountNumber: an});
              }} />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput style={[textStyles.text, styles.textInput, styles.accountNumberField]}
              value={accountNumberConfirmed}
              keyboardType="number-pad"
              ref="accountNumberConfirmedField"
              maxLength={8}
              placeholder="Confirm account number"
              onChangeText={(an) => this.setState({accountNumberConfirmed: an})} />
          </View>
        </View>
        <Button containerStyle={buttonContainerStyle} onPress={() => this._saveBank()}
          styleDisabled={styles.buttonDisabled} disabled={buttonDisabled}
          style={[textStyles.text, styles.buttonText]} >
          <Icon style={iconStyle} name="lock-combination" size={20}/>
          Save
        </Button>
      </View>
    );
  }

  _saveBank() {
    this.props.dispatch(updateUser(this.props.user.params, {
      sort_code: this.state.sortCode,
      account_number: this.state.accountNumber,
    }, this.props.navigator));
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(EditBank)
