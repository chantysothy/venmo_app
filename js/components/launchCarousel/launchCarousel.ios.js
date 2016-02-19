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

import { fetchFacebookLogin, fetchLoginWithToken } from '../../actions/loginActions.js';
import { withEmailAndToken } from '../../utils/utils';

var {width, height} = Dimensions.get('window');

var Carousel = require('react-native-carousel');
var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

class LaunchCarousel extends Component {
  componentDidMount() {
    withEmailAndToken((email, token) => {
        this.props.dispatch(fetchLoginWithToken(email, token, this.props.navigator));
    })
  }

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
    var self = this;
    FacebookLoginManager.newSession((error, data) => {
      if (error) {
        console.log('error ' + error);
      } else {
        self.props.dispatch(fetchFacebookLogin(data.userId, data.token, self.props.navigator));
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
