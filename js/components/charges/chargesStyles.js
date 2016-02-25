'use strict'; var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
} = React;

var {width, height} = Dimensions.get('window');

var colors = require('../../constants/colors.js');

var styles = StyleSheet.create({
  container: {
    width: width,
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
    borderColor: "green",
    borderWidth: 1,
  },
  declineButton: {
    backgroundColor: colors.grey,
    borderColor: "grey",
    borderWidth: 1,
  },
  commentText: {
    color: "#999999"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = styles;
