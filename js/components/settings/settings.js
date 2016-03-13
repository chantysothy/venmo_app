'use strict';

import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Navigator,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux/native';

import TitleBar from '../titleBar/titleBar';
import { withEmailAndToken } from '../../utils/utils';

var FacebookLoginManager = require('../../utils/facebookLoginManager');

var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

var styles = require('./settingsStyles.js');
var textStyles = require('../../shared/textStyles');
var colors = require('../../constants/colors.js');
var store = require('react-native-simple-store');

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ''
    };
  }
  render() {
    var user = this.props.user.params.user;

    return (
      <View style={styles.container}>
        <TitleBar text="Settings"
          back={() => this.props.navigator.pop()} />
        <ScrollView style={styles.body}>
          <View style={styles.header}>
            <Text style={[textStyles.text, styles.sectionHeaderText]}>
              Account and Security
            </Text>
          </View>
          <MenuButton
            text="Withdraw Money"
            onPress={this._transitionToWithdraw.bind(this)} />
          <MenuButton
            text="Change Your Phone Number"
            onPress={this._transitionToChangePhone.bind(this)} />
          <MenuButton
            text="Log Out"
            onPress={this._logout.bind(this)} />
          <View style={styles.header}>
            <Text style={[textStyles.text, styles.sectionHeaderText]}>
              Information and Support
            </Text>
          </View>
          <MenuButton
            text="Privacy Policy"
            onPress={this._transitionToPrivacyPolicy.bind(this)} />
        </ScrollView>
      </View>
    );
  }

  _logout() {
    FacebookLoginManager.logout();
    store.save('email', '').then(() => {
      store.save('token', '').then(() => {
        this.props.navigator.pop();
        this.props.navigator.popToTop();
      })
    });
  }

  _transitionToChangePhone() {
    this.props.navigator.push({
      id: 'PhoneVerification',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  _transitionToWithdraw() {
    this.props.navigator.push({
      id: 'Withdraw',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  _transitionToPrivacyPolicy() {
    this.props.navigator.push({
      id: 'PrivacyPolicy',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

class MenuButton extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={colors.grey}
        onPress={this.props.onPress}
        style={styles.menuButton}>
        <View style={styles.menuButtonTextContainer}>
          <View style={{flex: 1,}}>
            <Text style={[textStyles.text, styles.menuButtonText]}>
              { this.props.text }
            </Text>
          </View>
          <Icon style={styles.chevron}name="chevron-right" size ={20} color="grey"/>
        </View>
      </TouchableHighlight>
    )
  }
}


function mapStateToProps(state){
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Settings)
