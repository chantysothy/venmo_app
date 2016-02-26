'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

import colors from '../../constants/colors';

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    backgroundColor: colors.green,
    paddingTop: 12,
  },
  amountTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 80,
    fontWeight: '700',
  },
  numberButtonsContainer: {
    flex: 2,
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
    borderRightColor: colors.green,
  },
  payButtonsText: {
    fontSize: 28,
    color: colors.green,
  },
  modal: {
    height: height - 40,
    width: width,
  },
});

module.exports = styles;
