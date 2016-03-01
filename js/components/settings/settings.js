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


var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

var styles = require('./settingsStyles.js');
var textStyles = require('../../shared/textStyles');
var colors = require('../../constants/colors.js');

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
          back={() => this.props.navigator.pop()}
          forwardText="Done"
          forward={() => this.props.navigator.pop()}/>
        <ScrollView style={styles.body}>
          <View style={styles.header}>
            <Text style={[textStyles.text, styles.header]}>
              Account and Security
            </Text>
          </View>
          <MenuButton
            text="Edit Profile" />
          <MenuButton
            text="Invite Your friends" />
          <MenuButton
            text="Change Your Phone Number" />
          <MenuButton
            text="Withdraw to Bank" />
          <MenuButton
            text="Logout" />
          <View style={styles.header}>
            <Text style={[textStyles.text, styles.header]}>
              Information and Support
            </Text>
          </View>
          <MenuButton
            text="Help Center" />
          <MenuButton
            text="Send Feedback" />
        </ScrollView>
      </View>
    );
  }
}

class MenuButton extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={colors.grey}
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
