'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import colors from '../../constants/colors';

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    width: width,
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  text: {
    color: colors.green,
    fontSize: 25,
    fontWeight: '700',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
  textInputTo: {
    height: 60,
    width: width,
  },
  textInputNote: {
    height: 60,
    flex: 1,
  },
  targetNameContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  targetNameText: {
    fontSize: 23,
    fontWeight: '500',
    color: colors.lightGreen,
    paddingTop: 3,
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  resultPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: 'transparent',
  },
  resultName: {
    paddingLeft: 15,
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  searchResultsContainer: {
    height: height,
  },
  noteContainer: {
    width: width,
    height: 300,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

module.exports = styles;
