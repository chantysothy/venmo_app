'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    backgroundColor: '#0D8E96',
    padding: 30,
  },
  amountTextContainer: {
    height: height / 3,
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 40,
  },
  numberButton: {
    width: width / 3.5,
    height: height / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: 24,
  },
  payButtonsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    width: width,
    backgroundColor: 'white',
  },
  payButtons: {
    height: 80,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestButton: {
    borderRightWidth: 1,
    borderRightColor: '#0D8E96',
  },
  payButtonsText: {
    fontSize: 28,
    color: '#0D8E96',
  },
  modal: {
    height: height - 40,
    width: width,
  },
});

module.exports = styles;
