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

import TitleBar from '../titleBar/titleBar';

var Icon = require('react-native-vector-icons/Ionicons');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var styles = require('./userProfileStyles.js');
var textStyles = require('../../shared/textStyles');

class UserProfile extends Component {
  render() {
    var user = this.props.user.params.user;
    var balance = this.props.user.params.balance;
    var imageUrl = user.profile_photo_url;
    var fullName = user.first_name + " " + user.last_name;
    var displayName = user.display_name;
    var phone_number = user.phone_number;
    var about = user.about;
    var email = user.email;
    return (
      <View style={styles.container}>
        <TitleBar text="Profile"
          back={() => this.props.navigator.pop()}
          forwardText="Done"
          forward={() => this.props.navigator.pop()}/>
        <View style={styles.profile}>
          <Text style={styles.profileName}> { fullName } </Text>
          <Image
            style={styles.profilePhoto}
            source={{uri: imageUrl }} />
          <View
            style={styles.rightContainer}>
            <Text style={styles.profileName}> { email } </Text>
            <Text style={styles.profileName}> { phone_number } </Text>
            <Text style={styles.profileName}> { balance.balance_formatted } </Text>
            <Text style={styles.about}> { about } </Text>
          </View>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.user,
    feed: state.feed
  };
}


export default connect(mapStateToProps)(UserProfile)
