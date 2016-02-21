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
    justifyContent: 'center',
  },
  socialFeed: {
    width: width
  },
  navbar: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  feedButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#900",
  },

  leftButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  centerButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,

    borderColor: "#900",
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  rightButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  }
});

module.exports = styles;
