'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');
var colors = require('../../constants/colors.js');

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkgrey,
    height: height,
    width: 200,
  },
  profile: {
    marginTop: 30,
    marginLeft: 15,
    flexDirection: 'row',
  },
  profilePhoto: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  profileName: {
    fontWeight: 'bold',
    color: 'white'
  },
  rightContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  menuItems: {
    marginTop: 100,
    marginLeft: 15,
    marginRight: 15,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  }
});

module.exports = styles;
