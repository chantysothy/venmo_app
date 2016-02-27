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
var textStyles = require('../../shared/textStyles.js');

function isCharge(payment) {
  return payment.status == "pending";
}

var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: dataSource.cloneWithRows(this.props.feed)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.feed !== this.props.feed) {
      // DO NOT REMOVE LINE BELOW. Critical for performance.
      // It flushes out the old datasource
      this.setState({ dataSource: dataSource.cloneWithRows([])});

      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(nextProps.feed)
        });
      }, 1000);
    }
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={ this.state.dataSource }
        renderRow={this.renderRow}
       />
    );
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
        <Text style={[textStyles.text, textStyles.black, styles.feedItemSummary]}>
          <Text style={[styles.feedItemName]}>{payee} </Text>
          charged
          <Text style={styles.feedItemName}> {payer}</Text>
          <Text> { this.props.payment.amount.amount_formatted } </Text>
        </Text>
      )
    } else {
      var imageUrl = this.props.payer.user.profile_photo_url;
      var summary = (
        <Text style={[textStyles.text, textStyles.black, styles.feedItemSummary]}>
          <Text style={[styles.feedItemName]}>{payer} </Text>
          paid
          <Text style={[styles.feedItemName]}> {payee}</Text>
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
          <Text style={[textStyles.text, styles.feedItemNote]}>
            <Text>
              { this.props.payment.note }
            </Text>
          </Text>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="rgba(0,0,0,0)"
            style={styles.commentLink}>
            <Text style={[textStyles.text, styles.commentText]}>
              Comment
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.timeAgoContainer}>
          <TimeAgo
            style={[textStyles.text, styles.timeAgo]}
            time = {this.props.payment.updated_at} />
        </View>
      </View>
    )
  }
}

exports.Feed = Feed;
