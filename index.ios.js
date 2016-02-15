/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import LaunchCarousel from './js/components/launchCarousel/launchCarousel'

class venmo_app extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LaunchCarousel/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('venmo_app', () => venmo_app);
