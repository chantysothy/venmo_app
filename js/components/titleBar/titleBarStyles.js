'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import colors from '../../constants/colors'

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var styles = StyleSheet.create({
  iosBar: {
    paddingTop: 35,
    height: 75,
  },
  iosButton: {
    top: 35,
    paddingTop: 0,
    paddingBottom: 5,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.green,
    height: 55,
    width: width,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    paddingTop: 5,
  },
  forwardButton: {
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    paddingTop: 5,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',
  },
  sideText: {
    marginBottom: 5,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '700',
  },
  forwardTextDisabled: {
    color: colors.lightGreen,
  },
});

module.exports = styles;
