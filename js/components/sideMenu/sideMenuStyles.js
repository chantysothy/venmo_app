'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
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
  }

});

module.exports = styles;
