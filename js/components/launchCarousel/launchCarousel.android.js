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
            onPress={this._loginWithFacebook}>
            <Text> Touch me pls :) </Text>
          </TouchableHighlight>
          {/* <FBLogin */}
          {/*   onLogin={function(e){console.log(e)}} */}
          {/*   onLogout={function(e){console.log(e)}} */}
          {/*   onCancel={function(e){console.log(e)}} */}
          {/*   onPermissionsMissing={function(e){console.log(e)}} */}
          {/* /> */}
        </View>
      </Carousel>
    );
  }

  _loginWithFacebook() {
    FacebookLoginManager.loginWithPermissions(["email"], (error, data) => {
      if (error) {
        console.log('error ' + error);
      } else {
        console.log(data);
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
