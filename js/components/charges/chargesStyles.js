'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  profile: {
    marginTop: 30,
    marginLeft: 15,
    flexDirection: 'row',
  },
  profilePhoto: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'black',
  },
  profileName: {
    fontWeight: 'bold',
  },
  rightContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  menuItems: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  menuItem: {
  }
});

module.exports = styles;
