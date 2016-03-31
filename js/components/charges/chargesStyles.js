'use strict'; var React = require('react-native');

var {
  StyleSheet,
} = React;

import getDimensions from '../../shared/dimensions';
var {width, height} = getDimensions();

var colors = require('../../constants/colors.js');

var styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'white',
  },
  chargeListContainer: {
    flex: 1,
    alignItems: 'center',
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
  },
  feedItemRightContainer: {
    flex: 1,
    marginLeft: 5,
  },
  bolded: {
    fontWeight: 'bold',
  },
  feedItemSummary: {
    textAlign: 'left',
    color: 'black',
  },
  feedItemNote: {
    color: 'grey'
  },
  timeAgoContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  timeAgo: {
    color: '#C4C4C4',
    flex: 1,
  },
  button: {
    flex: 1,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: colors.green,
  },
  declineButton: {
    backgroundColor: colors.grey,
  },
  commentText: {
    color: "#999999"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChargesText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 20,
  },
  noChargeView: {
    backgroundColor: 'white',
    height: height,
    width: width,
    alignItems: 'center',
    paddingVertical: 50,
  },
});

module.exports = styles;
