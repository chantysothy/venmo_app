'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import getDimensions from '../../shared/dimensions';
import colors from '../../constants/colors';
var {width, height} = getDimensions();

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  numberTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 18,
  },
  numberButtonsContainer: {
    flex: 6,
  },
  numberButton: {
    width: width / 3.5,
    height: height / 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: 24,
  },
  numberText: {
    fontSize: 30,
  },
  placeholderNumber: {
    fontSize: 18,
    color: colors.lightGreen,
  },
});

module.exports = styles;
