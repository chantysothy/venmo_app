'use strict';

import React, {
  Component,
  Text,
  View,
  ScrollView,
  Navigator,
} from 'react-native';

import TitleBar from '../titleBar/titleBar';

var Icon = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var styles = require('./privacyPolicyStyles.js');
var textStyles = require('../../shared/textStyles');

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TitleBar text="Privacy"
          back={() => this.props.navigator.pop()} />
        <ScrollView contentContainerStyle={styles.policyContainer}>
          <Text style={[textStyles.text, styles.headerText]}>We're here for you.</Text>
          <Text style={[textStyles.text, styles.bodyText]}>
            We collect your personal information only for processing purposes. We'll never use
            your personal information except to process payments and serve you better.
            In particular, we'll never sell or share your information to any 3rd parties, or use it to
            serve you advertisements.
          </Text>
          <Text style={[textStyles.text, styles.bodyText]}>
            Information collected include your Facebook profile, email address, Facebook friends,
            phone number, first and last name, as well as payment information.
          </Text>
          <Text style={[textStyles.text, styles.bodyText]}>
            Your Facebook information is used only to show you updates on your friends' payments,
            and for verification of your account. Your phone number is used to provide you with
            SMS updates when payments go through, and for the verification of your account. Your email
            address is used to provide you with email updates when payments go through.
          </Text>
          <Text style={[textStyles.text, styles.bodyText]}>
            We do not retain payment information. All of that is kept securely with our payment processor, who are fully PCI compliant.
          </Text>
        </ScrollView>
      </View>
    );
  }
}
