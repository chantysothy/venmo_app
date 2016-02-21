'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux/native';
import { fetchSocialFeed } from '../../actions/socialFeedActions.js';
import { withEmailAndToken } from '../../utils/utils';

var TimeAgo = require('../../utils/timeAgo.js');
var styles = require('./feedStyles.js');

function isCharge(payment) {
  return payment.status == "pending";
}

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.feed != this.props.feed) {
      console.log("Updating feed...");
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.feed)
      });
    }
  }

  render() {
    if (this.props.isFetching) {
      return(<View><Text>Fetching...</Text></View>);
    } else {
      return (
        <ListView
          style={styles.container}
          dataSource={ this.state.dataSource }
          renderRow={this.renderRow} />
      );
    }
  }

  renderRow(item) {
    return (
      <FeedItem
        key = { item.payment.id }
        payment = { item.payment }
        payee = { item.payee }
        payer = { item.payer } />
    )
  }
}

class FeedItem extends Component {
  render() {
    var payee = this.props.payee.user.first_name + " " + this.props.payee.user.last_name;
    var payer = this.props.payer.user.first_name + " " + this.props.payer.user.last_name;
    if (isCharge(this.props.payment)) {
      var imageUrl = this.props.payee.user.profile_photo_url;
      var summary = (
        <Text style={styles.feedItemSummary}>
          <Text style={styles.feedItemName}>{ payee }</Text> charged <Text style={styles.feedItemName}> {payer} </Text>
          <Text> { this.props.payment.amount.amount_formatted } </Text>
        </Text>
      )
    } else {
      var imageUrl = this.props.payer.user.profile_photo_url;
      var summary = (
        <Text style={styles.feedItemSummary}>
          <Text style={styles.feedItemName}>{payer}</Text> paid <Text style={styles.feedItemName}> {payee} </Text>
          <Text> { this.props.payment.amount.amount_formatted } </Text>
        </Text>
      )
    }
    return (
      <View style={styles.feedItem}>
        <Image
          style={styles.feedItemThumbnail}
          source={{uri: imageUrl }} />
        <View style = { styles.feedItemRightContainer }>
          { summary }
          <Text style={styles.feedItemNote}>
            <Text>
              { this.props.payment.note }
            </Text>
          </Text>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            style={styles.commentLink}>
            <Text style={styles.commentText}>
              Comment
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.timeAgoContainer}>
          <TimeAgo
            style={styles.timeAgo}
            time = {this.props.payment.updated_at} />
        </View>
      </View>
    )
  }
}

exports.Feed = Feed;
