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
    height: height / 6,
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
  timeAgoContainer: {
    height: height / 6 - 10,
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
    underlayColor:"white",
  },
  commentText: {
    color: "#999999"
  }
});

module.exports = styles;
