'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  text: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: 'white',
  },
  centered: {
    textAlign: 'center',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 45,
  },
  subheaderText: {
    fontWeight: '500',
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  black: {
    color: 'black',
  }
});

module.exports = styles;
