'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profile: {
    marginTop: 30,
  },
  profilePhoto: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'black',
  },
  profileName: {
    fontWeight: 'bold',
  },
  rightContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  menuItems: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  menuItem: {
  }
});

module.exports = styles;
