'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('../../constants/colors.js');

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.verydarkgrey,
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
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rightMenuItem: {
    flex: 1
  },
  iconLabel: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  }
});

module.exports = styles;
