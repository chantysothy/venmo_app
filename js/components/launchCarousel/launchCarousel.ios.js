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
            onPress={() => this._loginWithFacebook()} underlayColor='#3B0B0B'>
            <Text> Login with Facebook</Text>
          </TouchableHighlight>
        </View>
      </Carousel>
    );
  }

  _loginWithFacebook() {
    FacebookLoginManager.newSession((error, data) => {
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
