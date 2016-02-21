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
      <View>
        <View>
          <TouchableHighlight
            onPress={this._goToPublicFeed}>
            <Text> Friends </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this._goToFriendFeed}>
            <Text> Friends </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this._goToPrivateProfile}>
            <Text> Friends </Text>
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
