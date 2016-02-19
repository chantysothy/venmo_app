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

import { fetchFacebookLogin } from '../../actions/loginActions.js';

var {width, height} = Dimensions.get('window');

//import * as Carousel from 'react-native-carousel';
var Carousel = require('react-native-carousel');
var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var {NativeModules} = require('react-native');
var FBLogin = require('react-native-facebook-login');
var FacebookLoginManager = NativeModules.FBLoginManager; // if needed

export default class LaunchCarousel extends Component {
  render() {
    return (
      <Carousel indicatorSize={15} indicatorOffset={30} delay={1500}>
        <View style={styles.container}>
          <Text>Page 1</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 2</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 3</Text>

          <TouchableHighlight
            onPress={() => this._loginWithFacebook()}>
            <Text> Touch me pls :) </Text>
          </TouchableHighlight>
        </View>
      </Carousel>
    );
  }

  _loginWithFacebook() {
    var self = this;
    FacebookLoginManager.loginWithPermissions(["email"], (error, data) => {
      if (error) {
        console.log('error ' + error);
      } else {
        // TODO use the actual token and id
        self.props.dispatch(fetchFacebookLogin("id_here", "token_here", self.props.navigator));
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'magenta',
  },
});

module.exports = connect()(LaunchCarousel);
