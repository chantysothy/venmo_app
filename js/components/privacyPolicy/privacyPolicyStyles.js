'use strict'; var React = require('react-native');

var {
  StyleSheet,
} = React;

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var colors = require('../../constants/colors.js');

var styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'white',
  },
  policyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 15,
  },
  bodyText: {
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
  },
});

module.exports = styles;
