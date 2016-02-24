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

var styles = require('./userProfileStyles.js');
var textStyles = require('../../shared/textStyles');

class UserProfile extends Component {
  render() {
    var user = this.props.user.params.user;
    var balance = this.props.user.params.balance;
    var imageUrl = user.profile_photo_url;
    var fullName = user.first_name + " " + user.last_name;
    return (
      <View style={styles.container}>
        <Image
          style={styles.profilePhoto}
          source={{uri: imageUrl }} />
        <View
          style={styles.rightContainer}>
          <Text style={styles.profileName}> { fullName } </Text>
          <Text style={styles.profileName}> { balance.balance_formatted } </Text>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.user
  };
}


export default connect(mapStateToProps)(UserProfile)
