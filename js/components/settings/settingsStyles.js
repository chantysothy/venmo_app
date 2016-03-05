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
    width: width,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  chevron: {
    marginRight: 10,
  },
  body: {
    flex: 1,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.mediumGrey,
  },
});

module.exports = styles;
