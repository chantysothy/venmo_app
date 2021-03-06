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
  RefreshControl,
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

function notDeclined(item) {
  return item.payment.status !== "declined";
}

var GO_MAKE_PAYMENTS = {
  isGoMakePayments: true,
  payment: { id: 1 },
  payee: {},
  payer: {}
};

var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: dataSource.cloneWithRows(this.props.feed.filter(notDeclined)),
      emptyDataSource: dataSource.cloneWithRows([GO_MAKE_PAYMENTS])
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.feed !== this.props.feed) {
      // DO NOT REMOVE LINE BELOW. Critical for performance.
      // It flushes out the old datasource
      this.setState({ dataSource: dataSource.cloneWithRows([])});

      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(nextProps.feed.filter(notDeclined))
        });
      }, 1);
    }
  }

  render() {
    var datasource = this.state.dataSource;
    if (this.props.feed.filter(notDeclined).length === 0) {
      datasource = this.state.emptyDataSource;
    }

    return (
      <ListView
        style={styles.container}
        renderHeader={this.props.renderHeader}
        dataSource={ datasource }
        renderRow={this.renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetching}
            onRefresh={this.props.refreshFeed.bind(this)}
            enabled={true}
          />}
        />
    );
  }

  renderRow(item) {
    return (
      <FeedItem
        key = { item.payment.id }
        item = { item } />
    )
  }
}

class FeedItem extends Component {
  render() {
    // If it's a placeholder, display some grey boxes.
    if (this.props.item.isPlaceholder) {
      return (
        <View style={styles.feedItem}>
          <View style={[styles.feedItemThumbnail, styles.greyBox]}>
          </View>
          <View style = { styles.feedItemRightContainer }>
            <View style={[styles.longBox, styles.greyBox]}>
            </View>
            <View style={[styles.longBox, styles.greyBox]}>
            </View>
            <View style={[styles.shortBox, styles.greyBox]}>
            </View>
          </View>
        </View>
      );
    }

    // If it's a GO_MAKE_PAYMENTS, display the message to go make some payments
    if (this.props.item.isGoMakePayments) {
      return (
        <View style={styles.noActivityView}>
          <Text style={[textStyles.text, styles.noActivityText]}>
            You've got no activity yet.
          </Text>
        </View>
      )
    }

    var payee = this.props.item.payee.user.first_name + " " + this.props.item.payee.user.last_name;
    var payer = this.props.item.payer.user.first_name + " " + this.props.item.payer.user.last_name;

    if (isCharge(this.props.item.payment)) {
      var imageUrl = this.props.item.payee.user.profile_photo_url;
      var summary = (
        <Text style={[textStyles.text, textStyles.black, styles.feedItemSummary]}>
          <Text style={[styles.feedItemName]}>{payee} </Text>
          charged
          <Text style={styles.feedItemName}> {payer}</Text>
          <Text> { this.props.item.payment.amount.amount_formatted } </Text>
        </Text>
      )
    } else {
      var imageUrl = this.props.item.payer.user.profile_photo_url;
      var summary = (
        <Text style={[textStyles.text, textStyles.black, styles.feedItemSummary]}>
          <Text style={[styles.feedItemName]}>{payer} </Text>
          paid
          <Text style={[styles.feedItemName]}> {payee}</Text>
          <Text> { this.props.item.payment.amount.amount_formatted } </Text>
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
              { this.props.item.payment.note }
            </Text>
          </Text>
        </View>
        <View style={styles.timeAgoContainer}>
          <TimeAgo
            style={[textStyles.text, styles.timeAgo]}
            time = {this.props.item.payment.updated_at} />
        </View>
      </View>
    )
  }
}

exports.Feed = Feed;
