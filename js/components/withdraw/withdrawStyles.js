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
    backgroundColor: colors.green,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  textInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#d7ccd0',
  },
  textInput: {
    height: 30,
    marginTop: 10,
    width: width - 60,
    color: 'white',
  },
  info: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    paddingBottom: 0,
    marginBottom: 0,
  },
  bottomInfo: {
    paddingBottom: 10,
  },
  inputContainer: {
    paddingVertical: 30,
  },
  button: {
    height: 50,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 50,
    width: 200,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerDisabled: {
    borderColor: colors.lightGreen,
  },
  buttonDisabled: {
    color: colors.lightGreen,
  },
  icon: {
    color: 'white',
    paddingRight: 10,
  },
  withdrawInput: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    width: 150,
  },
});

module.exports = styles;
