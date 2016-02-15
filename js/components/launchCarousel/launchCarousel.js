'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

var {width, height} = Dimensions.get('window');

//import * as Carousel from 'react-native-carousel';
var Carousel = require('react-native-carousel');

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
        </View>
      </Carousel>
    );
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
