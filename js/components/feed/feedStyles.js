'use strict'; var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "white"
  },
  feedItem: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
  },
  feedItemThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
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
  timeAgoContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  timeAgo: {
    marginTop: 10,
    paddingRight: 10,
    color: '#C4C4C4',
    flex: 1,
  },
  commentLink: {
    marginTop: 10,
  },
  commentText: {
    color: "#999999"
  }
});

module.exports = styles;
