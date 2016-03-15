'use strict'; var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('../../constants/colors.js');

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "white",
  },
  longBox: {
    flex: 1,
    height: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  shortBox: {
    width: 80,
    height: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  greyBox: {
    backgroundColor: colors.grey,
    borderRadius: 0,
    borderWidth: 0,
  },
  feedItem: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  feedItemThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    color: colors.darkgrey,
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
  },
  noActivityView: {
    backgroundColor: 'white',
    height: height,
    width: width,
    alignItems: 'center',
    paddingVertical: 50,
  },
  noActivityText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    paddingVertical: 20,
  },
});

module.exports = styles;
