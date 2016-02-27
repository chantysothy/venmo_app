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
    borderColor: 'white',
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 10,
  },
  explanation: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: 'black',
    textAlign: 'center',
  },
  body: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dialog: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verifyButtonContainer: {
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginHorizontal: 5,
    marginTop: 5,
  },
  verifyButton: {
    color: colors.green,
    fontSize: 20,
  },
});

module.exports = styles;
