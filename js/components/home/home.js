'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux/native';
import SocialFeed from '../feed/socialFeed.js';

var Icon = require('react-native-vector-icons/Ionicons');
var styles = require('./homeStyles');

class Home extends Component {
  render() {
    if (this.props.user.isFetching) {
      return(<View><Text>Fetching...</Text></View>);
    } else {
      var user = this.props.user.params.user;
      var balance = this.props.user.params.balance;

      return (
        <View style={styles.container}>
          <HomeNavBar user={this.props.user}/>
          <SocialFeed style={styles.socialFeed}/>
        </View>
      );
    }
  }
}

class HomeNavBar extends Component {
  render() {
    return (
      <View style={styles.navbar}>
        <View style={styles.feedButtons}>
          <TouchableHighlight
            style={styles.leftButton}
            onPress={this._goToPublicFeed}>
            <Icon name="earth" size ={30} color="#900"/>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.centerButton}
            onPress={this._goToFriendFeed}>
            <Icon name="person-stalker" size={30} color="#900"/>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.rightButton}
            onPress={this._goToPrivateProfile}>
            <Icon name="person" size={30} color="#900"/>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  _goToPublicFeed() {
  }

  _goToFriendFeed() {
  }

  _goToPrivateProfile() {
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Home)
