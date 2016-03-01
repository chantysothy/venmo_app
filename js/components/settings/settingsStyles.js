'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();
var colors = require('../../constants/colors.js');

var styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  menuButton: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    margin: 0,
    width: width,
    flex: 1,
  },
  menuButtonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 20,
    color: colors.darkGrey,
    flex: 1,
  },
  header: {
    fontSize: 20,
    width: width,
    fontWeight: 'bold',
    color: colors.mediumGrey,
    paddingLeft: 20,
    paddingTop: 15,
  },
  chevron: {
    marginRight: 10,
  },
  body: {
    flex: 1,
  }
});

module.exports = styles;
