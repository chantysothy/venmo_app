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
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: colors.green,
  },
  socialFeed: {
    width: width
  },
  navbar: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  feedButtons: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
  },
  feedButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  centerButton: {
    borderColor: "white",
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  moreMenuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  createPaymentButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
});

module.exports = styles;
