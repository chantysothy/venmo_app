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
    alignItems: 'stretch',
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

  feedButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },

  centerButton: {
    borderColor: "#900",
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
});

module.exports = styles;
