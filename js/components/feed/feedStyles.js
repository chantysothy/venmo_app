'use strict'; var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  feedItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  feedItemThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  feedItemRightContainer: {
    flex: 1
  },
  feedItemName: {
    fontWeight: 'bold',
  },
  feedItemSummary: {
    textAlign: 'left',
    marginLeft: 5,
  },
  feedItemNote: {
    marginLeft: 5,
  }
});

module.exports = styles;
