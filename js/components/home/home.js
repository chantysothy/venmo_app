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
          <Text>{user.email}</Text>
          <Text>{balance.balance_formatted}</Text>
          <SocialFeed />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Home)
