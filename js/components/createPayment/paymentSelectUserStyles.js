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
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    width: width,
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  textInputTo: {
    height: 60,
    width: width,
  },
  textInputNote: {
    height: 60,
    width: width,
  },
  targetNameContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  targetNameText: {
    fontSize: 20,
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resultPhoto: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  resultName: {
    paddingLeft: 15,
    fontWeight: '600',
    fontSize: 20,
  },
  searchResultsContainer: {
  },
});

module.exports = styles;
