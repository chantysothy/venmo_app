'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import colors from '../../constants/colors';
import getDimensions from '../../shared/dimensions';

var {width, height} = getDimensions();

var styles = StyleSheet.create({
  iosContainer: {
    paddingTop: 20,
  },
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
    backgroundColor: colors.green,
  },
  feedButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  leftButton: {
    borderTopLeftRadius: 5, // TODO Modify styles once borderTopRightRadius bug fixed in RN
    borderBottomLeftRadius: 5,
  },
  centerButton: {
    borderColor: "white",
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  rightButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
