'use strict';

import React, {
  Component,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import { connect } from 'react-redux/native';

var Icon = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var styles = require('./sideMenuStyles.js');
var textStyles = require('../../shared/textStyles');

class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ProfileSummary
          user={this.props.user}
          balance={this.props.balance} />
        <NavigationsMenu navigator={this.props.navigator} />
      </View>
    );
  }
}

class ProfileSummary extends Component {
  render() {
    var imageUrl = this.props.user.profile_photo_url;
    var fullName = this.props.user.first_name + " " + this.props.user.last_name;
    var balance = this.props.balance;
    return (
      <View style={styles.profile}>
        <Image style={styles.profilePhoto} source={{ uri: imageUrl }} />
        <View style={styles.rightContainer}>
          <Text style={styles.profileName}> { fullName } </Text>
          <Text style={styles.profileName}> { balance.balance_formatted } </Text>
        </View>
      </View>
    )
  }
}

class NavigationsMenu extends Component {
  render() {
    return (
      <View style={styles.menuItems}>
        <TouchableHighlight
          underlayColor='rgba(255,255,255,0.1)'
          onPress={this._transitionToUserProfile.bind(this)}>
          <View style={styles.menuItem}>
            <Icon style={styles.iconLabel} name="person" size={30} color="white"/>
            <Text style={[textStyles.text, styles.text]}> Profile </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='rgba(255,255,255,0.1)'
          onPress={this._transitionToCharges.bind(this)}>

          <View style={styles.menuItem}>
            <Icon style={styles.iconLabel} name="android-alert"  size={30} color="white"/>
            <Text style={[textStyles.text, styles.text]}> Charges </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='rgba(255,255,255,0.1)'
          onPress={this._transitionToSettings.bind(this)}>
          <View style={styles.menuItem}>
            <Icon style={styles.iconLabel} name="ios-cog" size={30} color="white"/>
            <Text style={[textStyles.text, styles.text]}> Settings </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _transitionToUserProfile() {
    this.props.navigator.push({
      id: 'UserProfile',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  _transitionToCharges() {
    this.props.navigator.push({
      id: 'Charges',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

  _transitionToSettings() {
    this.props.navigator.push({
      id: 'Settings',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

exports.Menu = Menu;
