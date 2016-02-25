'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

import colors from '../../constants/colors'

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 35,
    backgroundColor: colors.green,
    height: 75,
    width: width,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 35,
  },
  forwardButton: {
    position: 'absolute',
    right: 20,
    top: 35,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',
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
