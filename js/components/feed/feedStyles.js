'use strict'; var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    width: width,
    marginBottom: 30
  },
  feedItem: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  feedItemThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  feedItemRightContainer: {
    flex: 1,
    marginLeft: 5,
  },
  feedItemName: {
    fontWeight: 'bold',
  },
  feedItemSummary: {
    textAlign: 'left',
  },
  feedItemNote: {
  },
  timeAgo: {
    color: '#C4C4C4'
  }
});

module.exports = styles;
