'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  profilePhoto: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5
  },
  details: {
    fontSize: 15,
  },
  privateFeed: {
    paddingTop: 20,
    width: width,
    flex: 1,
  },
});

module.exports = styles;
